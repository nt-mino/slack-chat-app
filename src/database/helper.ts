import { channelMembers, channels, messages, users } from "./schema";

type SelectUser = typeof users.$inferSelect;
type InsertUser = typeof users.$inferInsert;
type SelectChannel = typeof channels.$inferSelect;
type InsertChannel = typeof channels.$inferInsert;
type SelectChannelMember = typeof channelMembers.$inferSelect;
type InsertChannelMember = typeof channelMembers.$inferInsert;
type SelectMessage = typeof messages.$inferSelect;
type InsertMessage = typeof messages.$inferInsert;

export type { SelectUser, InsertUser, SelectChannel, InsertChannel, SelectChannelMember, InsertChannelMember, SelectMessage, InsertMessage };
