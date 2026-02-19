package com.mohsinezaidi.greencoins.di

import com.mohsinezaidi.greencoins.data.local.dao.TransactionDao
import com.mohsinezaidi.greencoins.data.local.dao.UserDao
import com.mohsinezaidi.greencoins.data.repository.TransactionRepository
import com.mohsinezaidi.greencoins.data.repository.UserRepository
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import javax.inject.Singleton

/**
 * Hilt module for providing repository dependencies
 */
@Module
@InstallIn(SingletonComponent::class)
object RepositoryModule {

    @Provides
    @Singleton
    fun provideUserRepository(userDao: UserDao): UserRepository {
        return UserRepository(userDao)
    }

    @Provides
    @Singleton
    fun provideTransactionRepository(transactionDao: TransactionDao): TransactionRepository {
        return TransactionRepository(transactionDao)
    }
}