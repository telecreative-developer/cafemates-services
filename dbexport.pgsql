--
-- PostgreSQL database dump
--

-- Dumped from database version 10.4
-- Dumped by pg_dump version 10.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: cafemates; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cafemates (
    cafemates_id integer NOT NULL,
    id integer,
    location_name character varying(40),
    longitude character varying(255),
    latitude character varying(255),
    description text,
    created_at date,
    updated_at date,
    status_cafemates boolean,
    type_cafemates boolean,
    expired character varying(255)
);


ALTER TABLE public.cafemates OWNER TO postgres;

--
-- Name: basecamp_basecamp_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.basecamp_basecamp_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.basecamp_basecamp_id_seq OWNER TO postgres;

--
-- Name: basecamp_basecamp_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.basecamp_basecamp_id_seq OWNED BY public.cafemates.cafemates_id;


--
-- Name: cafemates_groups; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cafemates_groups (
    cafemates_group_id integer NOT NULL,
    id integer,
    cafemate_id integer,
    created_at date,
    updated_at date,
    master_room_id integer,
    status_approved integer,
    type_cafemates boolean,
    status_group_cafemates boolean
);


ALTER TABLE public.cafemates_groups OWNER TO postgres;

--
-- Name: basecamp_group_basecamp_group_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.basecamp_group_basecamp_group_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.basecamp_group_basecamp_group_id_seq OWNER TO postgres;

--
-- Name: basecamp_group_basecamp_group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.basecamp_group_basecamp_group_id_seq OWNED BY public.cafemates_groups.cafemates_group_id;


--
-- Name: chatting; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.chatting (
    chatting_id integer NOT NULL,
    content text,
    sender_id integer,
    updated_at date,
    created_at character varying(20),
    id integer,
    code_id character varying(255)
);


ALTER TABLE public.chatting OWNER TO postgres;

--
-- Name: chatting_chatting_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.chatting_chatting_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.chatting_chatting_id_seq OWNER TO postgres;

--
-- Name: chatting_chatting_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.chatting_chatting_id_seq OWNED BY public.chatting.chatting_id;


--
-- Name: chatting_group; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.chatting_group (
    chatting_group_id integer NOT NULL,
    content text,
    id integer,
    sender_id integer,
    created_at date,
    updated_at date
);


ALTER TABLE public.chatting_group OWNER TO postgres;

--
-- Name: chatting_group_chatting_group_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.chatting_group_chatting_group_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.chatting_group_chatting_group_id_seq OWNER TO postgres;

--
-- Name: chatting_group_chatting_group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.chatting_group_chatting_group_id_seq OWNED BY public.chatting_group.chatting_group_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    first_name character varying(20),
    last_name character varying(20),
    jobs character varying(30),
    age character varying(10),
    bod character varying(20),
    bop character varying(30),
    instagram_url text,
    facebook_url text,
    avatar_url text,
    longitude character varying(255),
    latitude character varying(255),
    username character varying(25),
    email character varying(40),
    gender boolean,
    status_user boolean,
    created_at date,
    updated_at date,
    aggrement boolean,
    company character varying(50),
    phone character varying(14),
    about character varying(255),
    background_url text,
    licence integer,
    password character varying(255)
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: cafemates cafemates_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cafemates ALTER COLUMN cafemates_id SET DEFAULT nextval('public.basecamp_basecamp_id_seq'::regclass);


--
-- Name: cafemates_groups cafemates_group_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cafemates_groups ALTER COLUMN cafemates_group_id SET DEFAULT nextval('public.basecamp_group_basecamp_group_id_seq'::regclass);


--
-- Name: chatting chatting_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chatting ALTER COLUMN chatting_id SET DEFAULT nextval('public.chatting_chatting_id_seq'::regclass);


--
-- Name: chatting_group chatting_group_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chatting_group ALTER COLUMN chatting_group_id SET DEFAULT nextval('public.chatting_group_chatting_group_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: cafemates; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cafemates (cafemates_id, id, location_name, longitude, latitude, description, created_at, updated_at, status_cafemates, type_cafemates, expired) FROM stdin;
1	8	Jakarta	106.84513	-6.21462	gabung sini dong, bete	2018-05-16	2018-05-16	t	t	\N
2	8	jakrta	124214214	2141421	gabung	2018-05-17	2018-05-17	t	f	Fri May 18 2018 08:08:11 GMT+0700
3	9	bogor	124214214	2141421	gabung sneh	2018-05-17	2018-05-17	t	f	Fri May 18 2018 09:57:47 GMT+0700
4	9	bogor	124214214	2141421	gabung sneh	2018-05-17	2018-05-17	t	f	Thu May 17 2018 20:00:43 GMT+0700
5	9	bogor	124214214	2141421	gabung sneh	2018-05-17	2018-05-17	t	f	Thu May 17 2018 21:01:33 GMT+0700
6	9	bogor	124214214	2141421	gabung sneh	2018-05-17	2018-05-17	t	f	Fri May 18 2018 00:01:59 GMT+0700
\.


--
-- Data for Name: cafemates_groups; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cafemates_groups (cafemates_group_id, id, cafemate_id, created_at, updated_at, master_room_id, status_approved, type_cafemates, status_group_cafemates) FROM stdin;
2	9	1	2018-05-16	2018-05-16	8	1	t	t
\.


--
-- Data for Name: chatting; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.chatting (chatting_id, content, sender_id, updated_at, created_at, id, code_id) FROM stdin;
6	chatting_with token	8	2018-05-17	2018-05-17	8	\N
\.


--
-- Data for Name: chatting_group; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.chatting_group (chatting_group_id, content, id, sender_id, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, first_name, last_name, jobs, age, bod, bop, instagram_url, facebook_url, avatar_url, longitude, latitude, username, email, gender, status_user, created_at, updated_at, aggrement, company, phone, about, background_url, licence, password) FROM stdin;
9	dick	ferdi	\N	\N	2017-04-21	\N	\N	\N	avaestar	\N	\N	dickferdi23161139	dickyfserfssser@gmail.com	t	t	2018-05-16	2018-05-16	t	\N	\N	\N	\N	\N	\N
8	FERDIANS	DIANS	Programmer	19	1999-03-29	Bogor	https://bla	https://bla	https://bla	\N	\N	dickyperdian21160953	dickyferfer@gmail.com	t	t	2018-05-16	2018-05-16	t	Telecreative	081729292xxx	Hoaaaaa	\N	\N	\N
10	FERDIANS	DIANS	\N	NaN	1999-21-12	\N	\N	\N	wwww	\N	\N	FERDIANSDIANS14180256	dicky@gmail.com	t	t	2018-05-18	2018-05-18	t	\N	\N	\N	\N	1	\N
11	FERDIANS	DIANS	\N	NaN	1999-21-12	\N	\N	\N	wwww	\N	\N	FERDIANSDIANS15180307	perdian@gmail.com	t	t	2018-05-18	2018-05-18	t	\N	\N	\N	\N	1	\N
12	perdian	dicky	\N	19	1999-03-21	\N	\N	\N	 .. 	\N	\N	perdiandicky15180359	dickyper@gmail.com	t	t	2018-05-18	2018-05-18	t	\N	\N	\N	\N	1	$2b$10$BDEOrIMRIo/ZxABMmsRePOe0cgqQWpJbTyT3/fOfiOZLBYH9TgoIq
\.


--
-- Name: basecamp_basecamp_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.basecamp_basecamp_id_seq', 6, true);


--
-- Name: basecamp_group_basecamp_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.basecamp_group_basecamp_group_id_seq', 3, true);


--
-- Name: chatting_chatting_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.chatting_chatting_id_seq', 6, true);


--
-- Name: chatting_group_chatting_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.chatting_group_chatting_group_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 12, true);


--
-- Name: cafemates_groups basecamp_group_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cafemates_groups
    ADD CONSTRAINT basecamp_group_pkey PRIMARY KEY (cafemates_group_id);


--
-- Name: cafemates basecamp_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cafemates
    ADD CONSTRAINT basecamp_pkey PRIMARY KEY (cafemates_id);


--
-- Name: chatting_group chatting_group_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chatting_group
    ADD CONSTRAINT chatting_group_pkey PRIMARY KEY (chatting_group_id);


--
-- Name: chatting chatting_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chatting
    ADD CONSTRAINT chatting_pkey PRIMARY KEY (chatting_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

