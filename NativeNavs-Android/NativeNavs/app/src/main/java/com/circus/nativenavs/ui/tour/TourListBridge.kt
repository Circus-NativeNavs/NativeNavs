package com.circus.nativenavs.ui.tour

import android.util.Log
import android.webkit.JavascriptInterface
import android.webkit.WebView
import com.circus.nativenavs.data.UserDto
import com.circus.nativenavs.ui.home.HomeActivity
import com.google.gson.Gson
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

private const val TAG = "싸피_TourListBridge"
class TourListBridge(
    private val homeActivity: HomeActivity,
    private val fragment: TourListFragment,
    private val webView: WebView
) {
    @JavascriptInterface
    fun showToast(text: String){
        homeActivity.showToast(text)
    }

    @JavascriptInterface
    fun navigateToTourDetailFragment(tourId: Int, navId: Int) {
        CoroutineScope(Dispatchers.Main).launch {
            fragment.moveToTourDetailFragment(tourId, navId)
        }
    }

    fun sendUserData(user: UserDto) {
        val gson = Gson()
        val json = gson.toJson(user)
        val script = "javascript:getUserData('$json');"
        evaluateWebViewFunction(script) { result ->
        }

    }

    fun sendSearchData(travel: String, date: String, category: List<Int> ) {
        val gson = Gson()
        val data = mapOf(
            "travel" to travel,
            "date" to date,
            "category" to category
        )
        val json = gson.toJson(data)
        val script = "javascript:getSearchData('$json');"
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