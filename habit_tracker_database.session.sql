ALTER TABLE weekly_log 
ADD CONSTRAINT unique_date_per_user UNIQUE (date, user_id);