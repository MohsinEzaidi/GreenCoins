package com.mohsinezaidi.greencoins.data.repository

import com.mohsinezaidi.greencoins.data.local.dao.UserDao
import com.mohsinezaidi.greencoins.data.local.entities.UserEntity
import com.mohsinezaidi.greencoins.data.local.entities.toUser
import com.mohsinezaidi.greencoins.data.model.User
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map
import javax.inject.Inject
import javax.inject.Singleton

/**
 * Repository for managing user data
 * Acts as a single source of truth for user-related operations
 */
@Singleton
class UserRepository @Inject constructor(
    private val userDao: UserDao
) {

    /**
     * Register a new user
     * @return User ID if successful, null if email already exists
     */
    suspend fun registerUser(name: String, email: String, password: String): Long? {
        val existingUser = userDao.getUserByEmail(email)
        if (existingUser != null) {
            return null // Email already exists
        }

        val newUser = UserEntity(
            name = name,
            email = email,
            password = password, // In production, hash this password
            coinBalance = 0
        )

        return userDao.insertUser(newUser)
    }

    /**
     * Login user with credentials
     * @return User if credentials are valid, null otherwise
     */
    suspend fun loginUser(email: String, password: String): User? {
        val userEntity = userDao.getUserByCredentials(email, password)
        return userEntity?.toUser()
    }

    /**
     * Get user by ID
     */
    suspend fun getUserById(userId: Long): User? {
        return userDao.getUserById(userId)?.toUser()
    }

    /**
     * Get user by ID as Flow for reactive updates
     */
    fun getUserByIdFlow(userId: Long): Flow<User?> {
        return userDao.getUserByIdFlow(userId).map { it?.toUser() }
    }

    /**
     * Update user's coin balance
     */
    suspend fun updateCoinBalance(userId: Long, newBalance: Int) {
        userDao.updateCoinBalance(userId, newBalance)
    }

    /**
     * Update user information
     */
    suspend fun updateUser(user: User, password: String = "") {
        val userEntity = UserEntity(
            id = user.id,
            name = user.name,
            email = user.email,
            password = password,
            coinBalance = user.coinBalance
        )
        userDao.updateUser(userEntity)
    }
}