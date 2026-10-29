-- OPTIONAL (ek baar chalao): Supabase Dashboard -> SQL Editor -> paste -> Run.
-- Contact form ke messages table pe name/email ki length limit (spam / bada junk rokne ke liye).
do $$ begin
  alter table messages add constraint messages_name_len check (char_length(name) <= 80);
exception when duplicate_object then null; end $$;

do $$ begin
  alter table messages add constraint messages_email_len check (char_length(email) <= 120);
exception when duplicate_object then null; end $$;
