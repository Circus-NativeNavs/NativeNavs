package com.circus.nativenavs.data

data class ProfileUserDto(
    val birth: String,
    val createdAt: String,
    val device: String,
    val email: String,
    val id: Int,
    val image: String,
    val isNav: Boolean,
    val korean: Boolean,
    val name: String,
    val nation: String,
    val navReviewAverage: Double,
    val navReviewCount: Int,
    var nickname: String,
    var phone: String,
    val removed: Boolean,
    val travReservationCount: Int,
    val updatedAt: String,
    val userLanguage: String
)