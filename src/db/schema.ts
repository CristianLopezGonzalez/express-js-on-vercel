import {
    pgTable,
    pgEnum,
    serial,
    text,
    integer,
    real,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ─── Enums ───────────────────────────────────────────────────────────────────

export const roleNameEnum = pgEnum("role_name", [
    "Duelist",
    "Sentinel",
    "Controller",
    "Initiator",
]);

export const agentNameEnum = pgEnum("agent_name", [
    "Brimstone",
    "Viper",
    "Omen",
    "Killjoy",
    "Cypher",
    "Sova",
    "Sage",
    "Skye",
    "Phoenix",
    "Jett",
    "Reyna",
    "Raze",
    "Breach",
    "Yoru",
    "KAYO",
    "Chamber",
    "Neon",
    "Fade",
    "Harbor",
    "Astra",
    "Clove",
    "Deadlock",
    "Gekko",
    "Iso",
    "Tejo",
    "Veto",
    "Vyse",
    "Waylay",
]);

export const abilityTypeEnum = pgEnum("ability_type", [
    "Basic",
    "Signature",
    "Ultimate",
]);

// ─── Tables ──────────────────────────────────────────────────────────────────

export const weapons = pgTable("weapons", {
    weaponId:    serial("weapon_id").primaryKey(),
    icon:        text("icon").notNull(),
    weaponName:  text("weapon_name").notNull().unique(),
    description: text("description").notNull(),
    type:        text("type").notNull(),
    fireMode:    text("fire_mode").notNull(),
    fireRate:    real("fire_rate").notNull(),
    reloadSpeed: real("reload_speed").notNull(),
    magazine:    integer("magazine").notNull(),
    headDamage:  integer("head_damage").notNull(),
    bodyDamage:  integer("body_damage").notNull(),
    legDamage:   integer("leg_damage").notNull(),
});

export const roles = pgTable("roles", {
    roleId:      serial("role_id").primaryKey(),
    roleName:    roleNameEnum("role_name").notNull().unique(),
    description: text("description").notNull(),
    icon:        text("icon").notNull(),
});

export const agents = pgTable("agents", {
    agentId:     serial("agent_id").primaryKey(),
    agentName:   agentNameEnum("agent_name").notNull().unique(),
    description: text("description").notNull(),
    agentNumber: integer("agent_number").notNull(),
    race:        text("race").notNull(),
    icon:        text("icon").notNull(),
    roleId:      integer("role_id")
        .notNull()
        .references(() => roles.roleId),
});

export const abilities = pgTable("abilities", {
    abilityId:   serial("ability_id").primaryKey(),
    abilityName: text("ability_name").notNull(),
    description: text("description").notNull(),
    icon:        text("icon").notNull(),
    agentId:     integer("agent_id")
        .notNull()
        .references(() => agents.agentId),
});

export const maps = pgTable("maps", {
    mapId:      serial("map_id").primaryKey(),
    mapName:    text("map_name").notNull().unique(),
    spikeSites: text("spike_sites").notNull(),
    icon:       text("icon").notNull(),
    miniMap:    text("mini_map").notNull(),
});

// ─── Types ───────────────────────────────────────────────────────────────────
export type Weapon   = typeof weapons.$inferSelect;
export type NewWeapon = typeof weapons.$inferInsert;

export type Role     = typeof roles.$inferSelect;
export type NewRole  = typeof roles.$inferInsert;

export type Agent    = typeof agents.$inferSelect;
export type NewAgent = typeof agents.$inferInsert;

export type Ability    = typeof abilities.$inferSelect;
export type NewAbility = typeof abilities.$inferInsert;

export type Map    = typeof maps.$inferSelect;
export type NewMap = typeof maps.$inferInsert;

// ─── Relations ───────────────────────────────────────────────────────────────

export const rolesRelations = relations(roles, ({ many }) => ({
    agents: many(agents),
}));

export const agentsRelations = relations(agents, ({ one, many }) => ({
    role: one(roles, { fields: [agents.roleId], references: [roles.roleId] }),
    abilities: many(abilities),
}));

export const abilitiesRelations = relations(abilities, ({ one }) => ({
    agent: one(agents, { fields: [abilities.agentId], references: [agents.agentId] }),
}));