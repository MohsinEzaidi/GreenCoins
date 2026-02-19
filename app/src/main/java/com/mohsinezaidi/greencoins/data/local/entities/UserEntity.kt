package com.mohsinezaidi.greencoins.data.local.entities

import androidx.room.Entity
import androidx.room.PrimaryKey
import com.mohsinezaidi.greencoins.data.model.User

/**
 * Room entity for User table
 */
@Entity(tableName = "users")
data class UserEntity(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val name: String,
    val email: String,
    val password: String, // In production, this should be hashed
    val coinBalance: Int = 0
)

/**
 * Extension function to convert UserEntity to domain User model
 */
fun UserEntity.toUser(): User {
    return User(
        id = id,
        name = name,
        email = email,
        coinBalance = coinBalance
    )
}

/**
 * Extension function to convert domain User model to UserEntity
 */
fun User.toEntity(password: String = ""): UserEntity {
    return UserEntity(
        id = id,
        name = name,
        email = email,
        password = password,
        coinBalance = coinBalance
    )
}