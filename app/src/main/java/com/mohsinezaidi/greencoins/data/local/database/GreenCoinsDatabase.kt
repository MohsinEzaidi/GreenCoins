package com.mohsinezaidi.greencoins.data.local.database

import androidx.room.Database
import androidx.room.RoomDatabase
import com.mohsinezaidi.greencoins.data.local.dao.TransactionDao
import com.mohsinezaidi.greencoins.data.local.dao.UserDao
import com.mohsinezaidi.greencoins.data.local.entities.TransactionEntity
import com.mohsinezaidi.greencoins.data.local.entities.UserEntity

/**
 * Room Database for GreenCoins app
 * Contains User and Transaction tables
 */
@Database(
    entities = [UserEntity::class, TransactionEntity::class],
    version = 1,
    exportSchema = false
)
abstract class GreenCoinsDatabase : RoomDatabase() {
    abstract fun userDao(): UserDao
    abstract fun transactionDao(): TransactionDao
}