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

export const abilityTypeEnum = pgEnum("ability_type", [
    "Prime", "Tactical", "Passive",
])

export const weaponTypeEnum = pgEnum("weapon_type", [
    "Assault Rifle", "Hand Cannon", "SMG", "Shotgun", "Sniper", "Arc Blaster", "Melee",
])

export const lootRarityEnum = pgEnum("loot_rarity", [
    "Standard", "Enhanced", "Deluxe", "Superior", "Prestige", "Priority", "Contraband",
])

export const lootCategoryEnum = pgEnum("loot_category", [
    "Salvage", "Eccentric Salvage", "Priority", "Currency",
])

export const salvageTypeEnum = pgEnum("salvage_type", [
    "Rod", "Wire", "Lens", "Node", "Circuit", "Resin",
    "Filament", "Compound", "Biostrip", "Plant", "Chempack", "Drive", "None",
])

export const consumableRarityEnum = pgEnum("consumable_rarity", [
    "Standard", "Enhanced", "Deluxe", "Superior", "Contraband",
])

export const consumableCategoryEnum = pgEnum("consumable_category", [
    "Medical", "Shield", "Medical & Shield", "Survival", "Stimulant",
])

export const consumableSubcategoryEnum = pgEnum("consumable_subcategory", [
    "None", "Buff", "Cleanse", "Utility",
])

// ─── Tables ──────────────────────────────────────────────────────────────────

export const runners = pgTable("runners", {
    runnerId: serial("runner_id").primaryKey(),
    runnerName: runnerNameEnum("runner_name").notNull().unique(),
    description: text("description").notNull(),
    playstyle: text("playstyle").notNull(),
    icon: text("icon").notNull(),
})

export const abilities = pgTable("abilities", {
    abilityId: serial("ability_id").primaryKey(),
    abilityName: text("ability_name").notNull(),
    description: text("description").notNull(),
    type: abilityTypeEnum("type").notNull(),
    icon: text("icon").notNull(),
    runnerId: integer("runner_id")
        .notNull()
        .references(() => runners.runnerId),
})

export const weapons = pgTable("weapons", {
    weaponId: serial("weapon_id").primaryKey(),
    weaponName: text("weapon_name").notNull().unique(),
    description: text("description").notNull(),
    type: weaponTypeEnum("type").notNull(),
    fireRate: real("fire_rate").notNull(),
    magazine: integer("magazine").notNull(),
    headDamage: integer("head_damage").notNull(),
    bodyDamage: integer("body_damage").notNull(),
    legDamage: integer("leg_damage").notNull(),
    icon: text("icon").notNull(),
})

export const maps = pgTable("maps", {
    mapId: serial("map_id").primaryKey(),
    mapName: text("map_name").notNull().unique(),
    description: text("description").notNull(),
    maxPlayers: integer("max_players").notNull(),
    icon: text("icon").notNull(),
})

export const loot = pgTable("loot", {
    lootId: serial("loot_id").primaryKey(),
    name: text("name").notNull().unique(),
    description: text("description").notNull(),
    icon: text("icon").notNull(),
    rarity: lootRarityEnum("rarity").notNull(),
    category: lootCategoryEnum("category").notNull(),
    salvageType: salvageTypeEnum("salvage_type").notNull().default("None"),
    price: integer("price").notNull().default(0),
    sources: text("sources"),
    usage: text("usage"),
})

export const consumables = pgTable("consumables", {
    consumableId: serial("consumable_id").primaryKey(),
    name: text("name").notNull().unique(),
    description: text("description").notNull(),
    icon: text("icon").notNull(),
    rarity: consumableRarityEnum("rarity").notNull(),
    category: consumableCategoryEnum("category").notNull(),
    subcategory: consumableSubcategoryEnum("subcategory").notNull().default("None"),
    buyPrice: integer("buy_price").notNull().default(0),
    sellPrice: integer("sell_price").notNull().default(0),
    autoSoldOnExfil: text("auto_sold_on_exfil").notNull().default("false"),
})

// ─── Types ───────────────────────────────────────────────────────────────────

export type Runner = typeof runners.$inferSelect
export type NewRunner = typeof runners.$inferInsert

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