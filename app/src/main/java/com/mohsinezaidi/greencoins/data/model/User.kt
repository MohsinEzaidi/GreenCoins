package com.mohsinezaidi.greencoins.data.model

/**
 * Domain model representing a user
 */
data class User(
    val id: Long = 0,
    val name: String,
    val email: String,
    val coinBalance: Int = 0
)