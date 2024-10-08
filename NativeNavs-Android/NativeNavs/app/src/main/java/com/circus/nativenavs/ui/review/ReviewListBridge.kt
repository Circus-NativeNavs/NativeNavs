package com.circus.nativenavs.ui.review

import android.provider.ContactsContract.CommonDataKinds.Nickname
import android.util.Log
import android.webkit.JavascriptInterface
import android.webkit.WebView
import com.circus.nativenavs.data.UserDto
import com.circus.nativenavs.ui.home.HomeActivity
import com.circus.nativenavs.ui.trip.MyTripFragment
import com.google.gson.Gson
import kotlin.math.log


class ReviewListBridge(
    private val homeActivity: HomeActivity,
    private val fragment: ReviewListFragment,
    private val webView: WebView
) {

    @JavascriptInterface
    fun navigateToTourReviewPhotoFragment(tourId: Int) {
        fragment.navigateToTourReviewPhotoFragment(tourId)
    }

    @JavascriptInterface
    fun navigateToNavReviewPhotoFragment(navId: Int) {
        fragment.navigateToNavReviewPhotoFragment(navId)
    }

    @JavascriptInterface
    fun navigateToTravReviewPhotoFragment(travId: Int) {
        fragment.navigateToTravReviewPhotoFragment(travId)
    }


    fun sendUserData(user: UserDto) {
        val gson = Gson()
        val json = gson.toJson(user)
        val script = "javascript:getUserData('$json');"
        evaluateWebViewFunction(script) { result ->
        }

    }

    private fun evaluateWebViewFunction(
        script: String,
        callback: ((String) -> Unit)? = null,
    ) {
        return webView.evaluateJavascript(script, callback)
    }

}