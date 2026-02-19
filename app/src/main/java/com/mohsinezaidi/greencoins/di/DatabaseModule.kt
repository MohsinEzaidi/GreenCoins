package com.mohsinezaidi.greencoins.di

import android.content.Context
import androidx.room.Room
import com.mohsinezaidi.greencoins.data.local.dao.TransactionDao
import com.mohsinezaidi.greencoins.data.local.dao.UserDao
import com.mohsinezaidi.greencoins.data.local.database.GreenCoinsDatabase
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.android.qualifiers.ApplicationContext
import dagger.hilt.components.SingletonComponent
import javax.inject.Singleton

/**
 * Hilt module for providing database-related dependencies
 */
@Module
@InstallIn(SingletonComponent::class)
object DatabaseModule {

    @Provides
    @Singleton
    fun provideGreenCoinsDatabase(
        @ApplicationContext context: Context
    ): GreenCoinsDatabase {
        return Room.databaseBuilder(
            context,
            GreenCoinsDatabase::class.java,
            "greencoins_database"
        )
            .fallbackToDestructiveMigration() // For development; use proper migrations in production
            .build()
    }

    @Provides
    @Singleton
    fun provideUserDao(database: GreenCoinsDatabase): UserDao {
        return database.userDao()
    }

    @Provides
    @Singleton
    fun provideTransactionDao(database: GreenCoinsDatabase): TransactionDao {
        return database.transactionDao()
    }
}