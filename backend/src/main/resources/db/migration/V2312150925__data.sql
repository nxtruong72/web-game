INSERT INTO public.users
(id, username, email, phone, "password", created_at, updated_at, last_visited_at, ip_created, ip_visited, device_used_for_login, device_used_for_register, roles, account_status)
VALUES(1, 'admin', 'dummu@gmail1.com', '0794409543', '$2a$10$CZTeUf5Juc1undZUy0EMfuX9EEw/oa9CUU.RepqTbsbPQDWTC95G6', '2024-01-14 17:10:08.812', '2024-01-14 17:11:06.159', NULL, NULL, NULL, NULL, NULL, 'ADMIN', 'ACTIVATED');

INSERT INTO public.users
(id, username, email, phone, "password", created_at, updated_at, last_visited_at, ip_created, ip_visited, device_used_for_login, device_used_for_register, roles, account_status)
VALUES(2, 'test1', 'test1@gmail1.com', '0794409544', '$2a$10$CZTeUf5Juc1undZUy0EMfuX9EEw/oa9CUU.RepqTbsbPQDWTC95G6', '2024-01-14 17:10:08.812', '2024-01-14 17:11:06.159', NULL, NULL, NULL, NULL, NULL, 'MEMBER', 'ACTIVATED');

INSERT INTO public.users
(id, username, email, phone, "password", created_at, updated_at, last_visited_at, ip_created, ip_visited, device_used_for_login, device_used_for_register, roles, account_status)
VALUES(3, 'test2', 'test2@gmail1.com', '0794409545', '$2a$10$CZTeUf5Juc1undZUy0EMfuX9EEw/oa9CUU.RepqTbsbPQDWTC95G6', '2024-01-14 17:10:08.812', '2024-01-14 17:11:06.159', NULL, NULL, NULL, NULL, NULL, 'MEMBER', 'ACTIVATED');

INSERT INTO public.wallets
(id, "version", balance, blocked_balance, reward, blocked_reward, user_id, created_at, updated_at)
VALUES(1, 0, 0.00000, 0.00000, 0.00000, 0.00000, 1, '2024-01-14 17:10:08.878', '2024-01-14 17:10:08.878');

INSERT INTO public.wallets
(id, "version", balance, blocked_balance, reward, blocked_reward, user_id, created_at, updated_at)
VALUES(2, 0, 0.00000, 0.00000, 0.00000, 0.00000, 2, '2024-01-14 17:10:08.878', '2024-01-14 17:10:08.878');

INSERT INTO public.wallets
(id, "version", balance, blocked_balance, reward, blocked_reward, user_id, created_at, updated_at)
VALUES(3, 0, 0.00000, 0.00000, 0.00000, 0.00000, 3, '2024-01-14 17:10:08.878', '2024-01-14 17:10:08.878');
