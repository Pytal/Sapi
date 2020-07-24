CREATE TABLE public.conversation (
    id integer NOT NULL,
    owner_id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE SEQUENCE public.conversation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.conversation_id_seq OWNED BY public.conversation.id;
CREATE TABLE public.conversation_participant (
    conversation_id integer NOT NULL,
    participant_id integer NOT NULL
);
CREATE TABLE public.message (
    id integer NOT NULL,
    conversation_id integer NOT NULL,
    sender_id integer NOT NULL,
    content text NOT NULL,
    "timestamp" timestamp with time zone DEFAULT now() NOT NULL
);
CREATE SEQUENCE public.message_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.message_id_seq OWNED BY public.message.id;
CREATE TABLE public.profile (
    id integer NOT NULL,
    first_name text,
    last_name text,
    birth_date date,
    gender text,
    email text NOT NULL,
    phone_number text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    user_id text NOT NULL,
    profile_picture text NOT NULL,
    bio text
);
CREATE SEQUENCE public.profiles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.profiles_id_seq OWNED BY public.profile.id;
CREATE TABLE public.spoon (
    id integer NOT NULL,
    sender_id integer NOT NULL,
    recipient_id integer NOT NULL,
    "timestamp" timestamp with time zone DEFAULT now() NOT NULL
);
CREATE SEQUENCE public.spoon_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.spoon_id_seq OWNED BY public.spoon.id;
ALTER TABLE ONLY public.conversation ALTER COLUMN id SET DEFAULT nextval('public.conversation_id_seq'::regclass);
ALTER TABLE ONLY public.message ALTER COLUMN id SET DEFAULT nextval('public.message_id_seq'::regclass);
ALTER TABLE ONLY public.profile ALTER COLUMN id SET DEFAULT nextval('public.profiles_id_seq'::regclass);
ALTER TABLE ONLY public.spoon ALTER COLUMN id SET DEFAULT nextval('public.spoon_id_seq'::regclass);
ALTER TABLE ONLY public.conversation_participant
    ADD CONSTRAINT conversation_participant_pkey PRIMARY KEY (conversation_id, participant_id);
ALTER TABLE ONLY public.conversation
    ADD CONSTRAINT conversation_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.message
    ADD CONSTRAINT message_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.profile
    ADD CONSTRAINT profile_id_key UNIQUE (id);
ALTER TABLE ONLY public.profile
    ADD CONSTRAINT profile_pkey PRIMARY KEY (user_id);
ALTER TABLE ONLY public.profile
    ADD CONSTRAINT profile_user_id_key UNIQUE (user_id);
ALTER TABLE ONLY public.profile
    ADD CONSTRAINT profiles_email_key UNIQUE (email);
ALTER TABLE ONLY public.profile
    ADD CONSTRAINT profiles_phone_number_key UNIQUE (phone_number);
ALTER TABLE ONLY public.spoon
    ADD CONSTRAINT spoon_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.conversation
    ADD CONSTRAINT conversation_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES public.profile(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.conversation_participant
    ADD CONSTRAINT conversation_participant_conversation_id_fkey FOREIGN KEY (conversation_id) REFERENCES public.conversation(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.conversation_participant
    ADD CONSTRAINT conversation_participant_participant_id_fkey FOREIGN KEY (participant_id) REFERENCES public.profile(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.message
    ADD CONSTRAINT message_conversation_id_fkey FOREIGN KEY (conversation_id) REFERENCES public.conversation(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.message
    ADD CONSTRAINT message_sender_id_fkey FOREIGN KEY (sender_id) REFERENCES public.profile(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.spoon
    ADD CONSTRAINT spoon_recipient_id_fkey FOREIGN KEY (recipient_id) REFERENCES public.profile(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.spoon
    ADD CONSTRAINT spoon_sender_id_fkey FOREIGN KEY (sender_id) REFERENCES public.profile(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
