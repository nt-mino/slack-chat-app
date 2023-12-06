CREATE TABLE `users` (
	`id` varchar(36) NOT NULL,
	`email` text NOT NULL,
	`name` text NOT NULL,
	`avatar` text,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`)
);
