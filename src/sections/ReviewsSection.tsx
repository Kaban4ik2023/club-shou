import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Shield, Trash2, Lock, Unlock } from 'lucide-react';
import { supabase } from '../lib/supabase';
import StarRating from '../components/StarRating';

interface Review {
  id: string;
  nickname: string;
  text: string;
  rating: number;
  created_at: string;
}

const PASSWORD_HASH = '21c644f41d8629f43ceea5b1218273b921348478ac0eabb2f1dd2fd8f7b26751';
const RATE_LIMIT_MS = 60 * 60 * 1000; // 1 час

async function sha256(text: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function getFingerprint(): string {
  const parts = [
    navigator.userAgent,
    navigator.language,
    screen.width,
    screen.height,
    new Date().getTimezoneOffset(),
  ];
  return btoa(parts.join('|')).slice(0, 32);
}

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [nickname, setNickname] = useState('');
  const [text, setText] = useState('');
  const [rating, setRating] = useState(0);
  const [captchaA, setCaptchaA] = useState(0);
  const [captchaB, setCaptchaB] = useState(0);
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');

  const captchaCorrect = useMemo(() => Number(captchaAnswer) === captchaA + captchaB, [captchaAnswer, captchaA, captchaB]);

  function regenerateCaptcha() {
    setCaptchaA(Math.floor(Math.random() * 10) + 1);
    setCaptchaB(Math.floor(Math.random() * 10) + 1);
    setCaptchaAnswer('');
  }

  async function fetchReviews() {
    const { data, error } = await supabase
      .from('reviews')
      .select('id,nickname,text,rating,created_at')
      .eq('is_deleted', false)
      .order('created_at', { ascending: false });
    if (!error && data) {
      setReviews(data as Review[]);
    }
  }

  useEffect(() => {
    fetchReviews();
    regenerateCaptcha();
  }, []);

  function canSubmit(): boolean {
    const last = localStorage.getItem('lastReviewTime');
    if (!last) return true;
    return Date.now() - Number(last) > RATE_LIMIT_MS;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!nickname.trim() || nickname.trim().length < 2 || nickname.trim().length > 50) {
      setError('Ник должен быть от 2 до 50 символов');
      return;
    }
    if (!text.trim() || text.trim().length < 5 || text.trim().length > 1000) {
      setError('Текст отзыва от 5 до 1000 символов');
      return;
    }
    if (rating < 1 || rating > 5) {
      setError('Выберите оценку от 1 до 5 звезд');
      return;
    }
    if (!captchaCorrect) {
      setError('Неверный ответ на капчу');
      return;
    }
    if (!canSubmit()) {
      setError('Можно оставлять только 1 отзыв в час');
      return;
    }

    setLoading(true);
    const { error: insertError } = await supabase.from('reviews').insert({
      nickname: nickname.trim(),
      text: text.trim(),
      rating,
      fingerprint: getFingerprint(),
    });
    setLoading(false);

    if (insertError) {
      setError('Ошибка отправки: ' + insertError.message);
      return;
    }

    localStorage.setItem('lastReviewTime', String(Date.now()));
    setNickname('');
    setText('');
    setRating(0);
    regenerateCaptcha();
    setSuccess('Отзыв отправлен!');
    fetchReviews();
  }

  async function handleAdminLogin() {
    const hash = await sha256(adminPassword);
    if (hash === PASSWORD_HASH) {
      setIsAdmin(true);
      setAdminPassword('');
      setError('');
    } else {
      setError('Неверный пароль');
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Удалить этот отзыв?')) return;
    const { error: rpcError } = await supabase.rpc('delete_review', {
      review_id: id,
      provided_hash: PASSWORD_HASH,
    });
    if (rpcError) {
      setError('Ошибка удаления: ' + rpcError.message);
    } else {
      fetchReviews();
    }
  }

  return (
    <section id="reviews" className="relative py-20 px-4 md:px-8 bg-[#0a0a0f]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-oswald font-bold text-center mb-4 tracking-wide uppercase">
            <span className="bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-500 bg-clip-text text-transparent">
              Отзывы гостей
            </span>
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Делитесь впечатлениями о Club Шоу. Ваши слова — лучшая награда для нашей команды.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Форма */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#111118] border border-white/10 rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Send size={20} className="text-yellow-500" />
              Написать отзыв
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Ваш ник</label>
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  maxLength={50}
                  placeholder="Максим Шоу"
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-600 focus:outline-none focus:border-yellow-500/50 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Оценка</label>
                <StarRating rating={rating} onRate={setRating} />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Текст отзыва</label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  maxLength={1000}
                  rows={4}
                  placeholder="Расскажите о вашем визите..."
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-600 focus:outline-none focus:border-yellow-500/50 transition-colors resize-none"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  <Shield size={14} className="inline mr-1" />
                  Защита от ботов: {captchaA} + {captchaB} = ?
                </label>
                <input
                  type="number"
                  value={captchaAnswer}
                  onChange={(e) => setCaptchaAnswer(e.target.value)}
                  placeholder="Ответ"
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-600 focus:outline-none focus:border-yellow-500/50 transition-colors"
                />
              </div>

              {error && <p className="text-red-400 text-sm">{error}</p>}
              {success && <p className="text-green-400 text-sm">{success}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 text-black font-semibold py-2.5 rounded-lg hover:from-yellow-500 hover:to-yellow-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Отправка...' : 'Отправить отзыв'}
              </button>
            </form>
          </motion.div>

          {/* Список отзывов */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {/* Админ-панель */}
            <div className="bg-[#111118] border border-white/10 rounded-xl p-4">
              {isAdmin ? (
                <div className="flex items-center justify-between">
                  <span className="text-green-400 text-sm flex items-center gap-2">
                    <Unlock size={16} /> Режим модератора активен
                  </span>
                  <button
                    onClick={() => setIsAdmin(false)}
                    className="text-xs text-gray-500 hover:text-white transition-colors"
                  >
                    Выйти
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="Пароль модератора"
                    className="flex-1 bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-yellow-500/50"
                    onKeyDown={(e) => e.key === 'Enter' && handleAdminLogin()}
                  />
                  <button
                    onClick={handleAdminLogin}
                    className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-3 py-1.5 transition-colors"
                  >
                    <Lock size={16} className="text-yellow-500" />
                  </button>
                </div>
              )}
            </div>

            {reviews.length === 0 ? (
              <div className="bg-[#111118] border border-white/10 rounded-xl p-8 text-center text-gray-500">
                Пока нет отзывов. Будьте первым!
              </div>
            ) : (
              reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-[#111118] border border-white/10 rounded-xl p-5 relative group"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-yellow-400">{review.nickname}</h4>
                      <p className="text-xs text-gray-500">
                        {new Date(review.created_at).toLocaleDateString('ru-RU')}
                      </p>
                    </div>
                    <StarRating rating={review.rating} readonly size={18} />
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">{review.text}</p>

                  {isAdmin && (
                    <button
                      onClick={() => handleDelete(review.id)}
                      className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-400 p-1"
                      title="Удалить"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
