CREATE TABLE `channelMembers` (
	`channelId` varchar(10) NOT NULL,
	`userId` varchar(36) NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `channelMembers_channelId_userId_pk` PRIMARY KEY(`channelId`,`userId`)
);
--> statement-breakpoint
CREATE TABLE `channels` (
	`id` varchar(10) NOT NULL,
	`ownerId` varchar(36),
	`name` text NOT NULL,
	`description` text,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `channels_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `messages` (
	`id` varchar(36) NOT NULL,
	`channelId` varchar(10),
	`userId` varchar(36),
	`content` text NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `messages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` varchar(36) NOT NULL,
	`email` text NOT NULL,
	`name` text NOT NULL,
	`avatar` text,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`)
);
