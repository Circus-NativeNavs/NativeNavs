package com.circus.nativenavs.ui.home.review

import android.os.Bundle
import android.view.View
import com.circus.nativenavs.R
import com.circus.nativenavs.config.BaseFragment
import com.circus.nativenavs.databinding.FragmentReviewRegisterBinding
import com.circus.nativenavs.util.CustomTitleWebView
import com.circus.nativenavs.util.popBackStack

class ReviewRegisterFragment : BaseFragment<FragmentReviewRegisterBinding>(FragmentReviewRegisterBinding::bind,R.layout.fragment_review_register) {

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        binding.reviewRegisterCustomWv.apply {
            setOnBackListener(object : CustomTitleWebView.OnBackClickListener{
                override fun onClick() {
                    popBackStack()
                }

            })
            loadWebViewUrl("www.naver.com")
        }
    }

}