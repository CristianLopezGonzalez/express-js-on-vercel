import {
    pgTable,
    pgEnum,
    serial,
    text,
    integer,
    real,
} from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"

// ─── Enums ───────────────────────────────────────────────────────────────────

export const runnerNameEnum = pgEnum("runner_name", [
    "Destroyer", "Vandal", "Recon", "Assassin", "Triage", "Thief", "Rook",
])

export const marathonAbilityTypeEnum = pgEnum("marathon_ability_type", [
    "Prime", "Tactical", "Passive",
])

export const marathonWeaponTypeEnum = pgEnum("marathon_weapon_type", [
    "Assault Rifle", "Hand Cannon", "SMG", "Shotgun", "Sniper", "Arc Blaster", "Melee",
])

export const lootRarityEnum = pgEnum("loot_rarity", [
    "Standard", "Enhanced", "Deluxe", "Superior", "Prestige", "Priority", "Contraband",
])

export const consumableCategoryEnum = pgEnum("consumable_category", [
    "Medical", "Shield", "Medical & Shield", "Survival", "Stimulant",
])

export const consumableSubcategoryEnum = pgEnum("consumable_subcategory", [
    "None", "Buff", "Cleanse", "Utility",
])

// ─── Tables ──────────────────────────────────────────────────────────────────

export const runners = pgTable("marathon_runners", {
    runnerId: serial("runner_id").primaryKey(),
    runnerName: runnerNameEnum("runner_name").notNull().unique(),
    description: text("description").notNull(),
    Model: text("model").notNull(),
    icon: text("icon").notNull(),
})

export const factions = pgTable("marathon_factions", {
    factionId: serial("faction_id").primaryKey(),
    factionName: text("faction_name").notNull().unique(),
    description: text("description").notNull(),
    role: text("role").notNull(),
    icon: text("icon").notNull(),
})

export const abilities = pgTable("marathon_abilities", {
    abilityId: serial("ability_id").primaryKey(),
    abilityName: text("ability_name").notNull(),
    description: text("description").notNull(),
    type: marathonAbilityTypeEnum("type").notNull(),
    icon: text("icon").notNull(),
    runnerId: integer("runner_id")
        .notNull()
        .references(() => runners.runnerId),
})

export const weapons = pgTable("marathon_weapons", {
    weaponId: serial("weapon_id").primaryKey(),
    weaponName: text("weapon_name").notNull().unique(),
    description: text("description").notNull(),
    type: marathonWeaponTypeEnum("type").notNull(),
    fireRate: real("fire_rate").notNull(),
    magazine: integer("magazine").notNull(),
    headDamage: integer("head_damage").notNull(),
    bodyDamage: integer("body_damage").notNull(),
    legDamage: integer("leg_damage").notNull(),
    icon: text("icon").notNull(),
})

export const maps = pgTable("marathon_maps", {
    mapId: serial("map_id").primaryKey(),
    mapName: text("map_name").notNull().unique(),
    description: text("description").notNull(),
    icon1: text("icon1").notNull(),
    icon2: text("icon2").notNull(),
})

export const loot = pgTable("marathon_loot", {
    lootId: serial("loot_id").primaryKey(),
    name: text("name").notNull().unique(),
    description: text("description").notNull(),
    icon: text("icon").notNull(),
    rarity: lootRarityEnum("rarity").notNull(),
})

export const consumables = pgTable("marathon_consumables", {
    consumableId: serial("consumable_id").primaryKey(),
    name: text("name").notNull().unique(),
    description: text("description").notNull(),
    icon: text("icon").notNull(),
    category: consumableCategoryEnum("category").notNull(),
})

// ─── Types ───────────────────────────────────────────────────────────────────

export type Runner = typeof runners.$inferSelect
export type NewRunner = typeof runners.$inferInsert

export type Faction = typeof factions.$inferSelect
export type NewFaction = typeof factions.$inferInsert

export type Ability = typeof abilities.$inferSelect
export type NewAbility = typeof abilities.$inferInsert

export type Weapon = typeof weapons.$inferSelect
export type NewWeapon = typeof weapons.$inferInsert

export type Map = typeof maps.$inferSelect
export type NewMap = typeof maps.$inferInsert

export type Loot = typeof loot.$inferSelect
export type NewLoot = typeof loot.$inferInsert

export type Consumable = typeof consumables.$inferSelect
export type NewConsumable = typeof consumables.$inferInsert

// ─── Relations ───────────────────────────────────────────────────────────────

export const runnersRelations = relations(runners, ({ many }) => ({
    abilities: many(abilities),
}))

export const abilitiesRelations = relations(abilities, ({ one }) => ({
    runner: one(runners, {
        fields: [abilities.runnerId],
        references: [runners.runnerId],
    }),
}))