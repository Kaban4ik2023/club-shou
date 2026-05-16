-- 1. Создание таблицы отзывов
CREATE TABLE IF NOT EXISTS reviews (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  nickname text NOT NULL CHECK (length(nickname) BETWEEN 2 AND 50),
  text text NOT NULL CHECK (length(text) BETWEEN 5 AND 1000),
  rating int NOT NULL CHECK (rating BETWEEN 1 AND 5),
  fingerprint text DEFAULT '',
  is_deleted boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- 2. Включение RLS
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- 3. Политики доступа
CREATE POLICY "Allow select active reviews" ON reviews
  FOR SELECT USING (is_deleted = false);

CREATE POLICY "Allow insert reviews" ON reviews
  FOR INSERT WITH CHECK (true);

-- 4. Функция удаления отзыва по паролю (хеш проверяется на клиенте, здесь — точное совпадение)
CREATE OR REPLACE FUNCTION delete_review(review_id uuid, provided_hash text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  correct_hash text := '21c644f41d8629f43ceea5b1218273b921348478ac0eabb2f1dd2fd8f7b26751';
BEGIN
  IF provided_hash = correct_hash THEN
    UPDATE reviews SET is_deleted = true WHERE id = review_id;
    RETURN true;
  END IF;
  RETURN false;
END;
$$;

-- 5. Разрешение вызова функции anon-юзерам
GRANT EXECUTE ON FUNCTION delete_review(uuid, text) TO anon;
