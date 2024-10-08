package com.circus.nativenavs.ui.mypage

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.view.View
import androidx.fragment.app.activityViewModels
import com.bumptech.glide.Glide
import com.circus.nativenavs.R
import com.circus.nativenavs.config.BaseFragment
import com.circus.nativenavs.databinding.FragmentMypageBinding
import com.circus.nativenavs.ui.home.HomeActivity
import com.circus.nativenavs.ui.home.HomeActivityViewModel
import com.circus.nativenavs.ui.login.LoginActivity
import com.circus.nativenavs.ui.qr.CustomCaptureActivity
import com.circus.nativenavs.ui.qr.QRCreateActivity
import com.circus.nativenavs.util.LOGOUT
import com.circus.nativenavs.util.SharedPref
import com.circus.nativenavs.util.navigate
import com.google.android.material.dialog.MaterialAlertDialogBuilder
import com.google.zxing.integration.android.IntentIntegrator

class MypageFragment :
    BaseFragment<FragmentMypageBinding>(FragmentMypageBinding::bind, R.layout.fragment_mypage) {

    private lateinit var homeActivity: HomeActivity
    private val homeActivityViewModel: HomeActivityViewModel by activityViewModels()

    override fun onAttach(context: Context) {
        super.onAttach(context)
        homeActivity = context as HomeActivity
    }

    override fun onResume() {
        super.onResume()
        homeActivity.hideBottomNav(true)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        initEvent()
        initObserve()
    }

    private fun initObserve() {
        homeActivityViewModel.userDto.observe(viewLifecycleOwner) { it ->
            Glide.with(this)
                .load(it.image)
                .placeholder(R.drawable.logo_nativenavs)
                .error(R.drawable.logo_nativenavs)
                .fallback(R.drawable.logo_nativenavs)
                .into(binding.mypageProfileImgIv)
            binding.mypageNicknameTv.text = it.nickname
        }

        homeActivityViewModel.withdrawalStatus.observe(viewLifecycleOwner) { statusCode ->
            when (statusCode) {
                200 -> {
                    showToast(getString(R.string.success))
                    SharedPref.remove(LOGOUT)
                    startActivity(Intent(requireContext(), LoginActivity::class.java))
                    activity?.finish()
                }

                else -> {
                    showToast(getString(R.string.fail))
                }
            }


        }
    }

    private fun initEvent() {
        binding.mypageNotiIv.setOnClickListener {
            navigate(R.id.action_mypageFragment_to_notificationFragment)
        }

        binding.mypageProfileCl.setOnClickListener {
            val action =
                MypageFragmentDirections.actionMypageFragmentToProfileFragment(
                    userId = SharedPref.userId!!,
                    0,
                    0
                )
            navigate(action)
        }

        binding.mypageSettingCl.setOnClickListener {
            navigate(R.id.action_mypageFragment_to_appSettingFragment)
        }

        binding.mypageTeamCl.setOnClickListener {
            navigate(R.id.action_mypageFragment_to_teamIntroFragment)
        }

        binding.mypageTosCl.setOnClickListener {
            navigate(R.id.action_mypageFragment_to_tosFragment)
        }

        binding.mypagePasswordCl.setOnClickListener {
            checkPassDialog()
        }

        binding.mypageLogoutCl.setOnClickListener {
            SharedPref.remove(LOGOUT)
            startActivity(Intent(requireContext(), LoginActivity::class.java))
            activity?.finish()
        }

        binding.mypageWithdrawalCl.setOnClickListener {
            val builder = MaterialAlertDialogBuilder(homeActivity)
            builder.setTitle(getString(R.string.dialog_user_delete_title))
            builder.setMessage(getString(R.string.dialog_user_delete_title))
            builder.setPositiveButton(getString(R.string.dialog_ok_btn)) { dialog, which ->
                homeActivityViewModel.withdrawal()
            }
            builder.setNegativeButton(getString(R.string.dialog_cancel_btn)) { dialog, which ->
                dialog.dismiss()
            }

            builder.show()
        }

    }

    private fun checkPassDialog() {
        val builder = MaterialAlertDialogBuilder(homeActivity)
        val view = homeActivity.layoutInflater.inflate(R.layout.dialog_pass_check, null)

        builder.setView(view)
        builder.setTitle(getString(R.string.dialog_pass_title))
        builder.setMessage(getString(R.string.dialog_pass_content))
        builder.setPositiveButton(getString(R.string.dialog_ok_btn)) { dialog, which ->
            navigate(R.id.action_mypageFragment_to_passwordFragment)
        }

        builder.setNegativeButton(getString(R.string.dialog_cancel_btn)) { dialog, which ->
            dialog.dismiss()
        }
        builder.show()
    }

}