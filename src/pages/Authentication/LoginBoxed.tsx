import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { useEffect, useState } from 'react';
import { setPageTitle, toggleRTL } from '../../store/themeConfigSlice';
import Dropdown from '../../components/Dropdown';
import i18next from 'i18next';
import IconCaretDown from '../../components/Icon/IconCaretDown';
import IconMail from '../../components/Icon/IconMail';
import IconLockDots from '../../components/Icon/IconLockDots';
import IconInstagram from '../../components/Icon/IconInstagram';
import IconFacebookCircle from '../../components/Icon/IconFacebookCircle';
import IconTwitter from '../../components/Icon/IconTwitter';
import IconGoogle from '../../components/Icon/IconGoogle';
import { useFormik } from 'formik';
import { FirstResetPasswordService, logInOtpService, logInService, resetPasswordService } from '../../store/services/authService';
import { setMode } from '../../store/slices/authSlice';
import { getLoginSchema } from '../../utils/validationSchema';

const LoginBoxed = () => {
    const dispatch = useDispatch();
    const { isLoading, mode, numberOfLogin, token } = useSelector((state: IRootState) => state.auth);

    useEffect(() => {
        dispatch(setPageTitle('Login Boxed'));
    });
    const navigate = useNavigate();
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const setLocale = (flag: string) => {
        setFlag(flag);
        if (flag.toLowerCase() === 'ae') {
            dispatch(toggleRTL('rtl'));
        } else {
            dispatch(toggleRTL('ltr'));
        }
    };
    const [flag, setFlag] = useState(themeConfig.locale);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
        // validationSchema: getLoginSchema(mode),
        onSubmit: (values) => {
            const email = values.email?.trim(); // safely declare early
            const password = values.password?.trim();
            const confirmPassword = values.confirmPassword?.trim();
            switch (mode) {
                case '':
                    const data = { email, password };

                    dispatch(logInService(data) as any).then((action: any) => {
                        if (logInService.fulfilled.match(action)) {
                            const data = action.payload;
                            if (data.token) {
                                if (data.numberOfLogin !== null && data.numberOfLogin > 0) {
                                    navigate('/cms');
                                } else if (data.numberOfLogin !== null && data.numberOfLogin === 0) {
                                    dispatch(setMode('otp'));
                                }
                            } else {
                                alert(data.message || 'Login failed. Please try again.');
                            }
                        }
                    });
                    break;

                case 'otp':
                    dispatch(logInOtpService({ token, password }) as any).then((action: any) => {
                        if (logInOtpService.fulfilled.match(action)) {
                            dispatch(setMode('password'));
                        }
                    });
                    break;

                case 'password':
                    const confirmPassword = values.confirmPassword?.trim();
                    if (numberOfLogin === 0) {
                        dispatch(FirstResetPasswordService({ password, confirmPassword, token }) as any).then((action) => {
                            if (FirstResetPasswordService.fulfilled.match(action)) {
                                dispatch(setMode(''));
                            }
                        });
                    }
                    break;

                default:
                    dispatch(logInService({ email, password }) as any).then((action: any) => {
                        if (logInService.fulfilled.match(action)) {
                            const data = action.payload;
                            if (data.token) {
                                if (data.numberOfLogin !== null && data.numberOfLogin > 0) {
                                    navigate('/cms');
                                } else if (data.numberOfLogin !== null && data.numberOfLogin === 0) {
                                    dispatch(setMode('otp'));
                                }
                            } else {
                                alert(data.message || 'Login failed. Please try again.');
                            }
                        }
                    });
                    break;
            }
        },
    });

    const passwordInputInfo = () => {
        let label = '';
        let placeholder = '';

        switch (mode) {
            case 'otp':
                label = 'Otp';
                placeholder = 'Enter Otp';
                break;
            case 'password':
            case undefined:
            case '':
                // Default or explicitly password
                label = 'Password';
                placeholder = 'Enter Password';
                break;

            default:
                label = 'Password';
                placeholder = 'Enter Password';
                break;
        }

        return { label, placeholder };
    };
    const modeFlow = ['', 'otp', 'password'];

    const handleBack = () => {
        const currentIndex = modeFlow.indexOf(mode);
        if (currentIndex > 0) {
            dispatch(setMode(modeFlow[currentIndex - 1]));
        }
    };
    return (
        <div>
            <div className="absolute inset-0">
                <img src="/assets/images/auth/bg-gradient.png" alt="image" className="h-full w-full object-cover" />
            </div>

            <div className="relative flex min-h-screen items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
                <img src="/assets/images/auth/coming-soon-object1.png" alt="image" className="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2" />
                <img src="/assets/images/auth/coming-soon-object2.png" alt="image" className="absolute left-24 top-0 h-40 md:left-[30%]" />
                <img src="/assets/images/auth/coming-soon-object3.png" alt="image" className="absolute right-0 top-0 h-[300px]" />
                <img src="/assets/images/auth/polygon-object.svg" alt="image" className="absolute bottom-0 end-[28%]" />
                <div className="relative w-full max-w-[870px] rounded-md bg-[linear-gradient(45deg,#fff9f9_0%,rgba(255,255,255,0)_25%,rgba(255,255,255,0)_75%,_#fff9f9_100%)] p-2 dark:bg-[linear-gradient(52.22deg,#0E1726_0%,rgba(14,23,38,0)_18.66%,rgba(14,23,38,0)_51.04%,rgba(14,23,38,0)_80.07%,#0E1726_100%)]">
                    <div className="relative flex flex-col justify-center rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 px-6 lg:min-h-[758px] py-20">
                        {/* <div className="absolute top-6 end-6">
                            <div className="dropdown">
                                <Dropdown
                                    offset={[0, 8]}
                                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                    btnClassName="flex items-center gap-2.5 rounded-lg border border-white-dark/30 bg-white px-2 py-1.5 text-white-dark hover:border-primary hover:text-primary dark:bg-black"
                                    button={
                                        <>
                                            <div>
                                                <img src={`/assets/images/flags/${flag.toUpperCase()}.svg`} alt="image" className="h-5 w-5 rounded-full object-cover" />
                                            </div>
                                            <div className="text-base font-bold uppercase">{flag}</div>
                                            <span className="shrink-0">
                                                <IconCaretDown />
                                            </span>
                                        </>
                                    }
                                >
                                    <ul className="!px-2 text-dark dark:text-white-dark grid grid-cols-2 gap-2 font-semibold dark:text-white-light/90 w-[280px]">
                                        {themeConfig.languageList.map((item: any) => {
                                            return (
                                                <li key={item.code}>
                                                    <button
                                                        type="button"
                                                        className={`flex w-full hover:text-primary rounded-lg ${flag === item.code ? 'bg-primary/10 text-primary' : ''}`}
                                                        onClick={() => {
                                                            i18next.changeLanguage(item.code);
                                                            // setFlag(item.code);
                                                            setLocale(item.code);
                                                        }}
                                                    >
                                                        <img src={`/assets/images/flags/${item.code.toUpperCase()}.svg`} alt="flag" className="w-5 h-5 object-cover rounded-full" />
                                                        <span className="ltr:ml-3 rtl:mr-3">{item.name}</span>
                                                    </button>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </Dropdown>
                            </div>
                        </div> */}
                        <div className="mx-auto w-full max-w-[440px]">
                            <div className="mb-10">
                                <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">{mode === 'otp' ? 'Sign in with otp' : 'Sign in'}</h1>
                                <p className="text-base font-bold leading-normal text-white-dark">Enter your email and password to login</p>
                            </div>

                            <form className="space-y-5 dark:text-white" onSubmit={formik.handleSubmit}>
                                {!mode && (
                                    <div className={formik.submitCount ? (formik.errors.email ? 'has-error' : 'has-success') : ''}>
                                        <label htmlFor="email">Email</label>
                                        <div className="relative text-white-dark">
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                placeholder="Enter Email"
                                                className="form-input ps-10 placeholder:text-white-dark"
                                                value={formik.values.email}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                                <IconMail fill={true} />
                                            </span>
                                        </div>

                                        {formik.submitCount ? (
                                            formik.errors.email ? (
                                                <div className="text-danger mt-1">{formik.errors.email}</div>
                                            ) : (
                                                <></>
                                            )
                                        ) : null}
                                    </div>
                                )}

                                <div className={formik.submitCount ? (formik.errors.password ? 'has-error' : 'has-success') : ''}>
                                    <label htmlFor="password">{passwordInputInfo().label}</label>
                                    <div className="relative text-white-dark">
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            placeholder={passwordInputInfo().placeholder}
                                            className="form-input ps-10 placeholder:text-white-dark"
                                            value={formik.values.password}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconLockDots fill={true} />
                                        </span>
                                    </div>

                                    {formik.submitCount ? (
                                        formik.errors.password ? (
                                            <div className="text-danger mt-1">{formik.errors.password}</div>
                                        ) : (
                                            <></>
                                        )
                                    ) : null}
                                </div>






                                {mode === 'password' && (
                                    <div>
                                        <label htmlFor="confirm-password">Password confirmation</label>
                                        <div className="relative text-white-dark">
                                            <input
                                                id="confirm-password"
                                                name="confirmPassword"
                                                type="password"
                                                placeholder="Enter confirm Password"
                                                className="form-input ps-10 placeholder:text-white-dark"
                                                value={formik.values.confirmPassword}
                                                onChange={formik.handleChange}
                                            />
                                            <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                                <IconLockDots fill={true} />
                                            </span>
                                        </div>
                                    </div>
                                )}
                                {/* <div>
                                    <label className="flex cursor-pointer items-center">
                                        <input type="checkbox" name="subscribe" checked={formik.values.subscribe} onChange={formik.handleChange} className="form-checkbox bg-white dark:bg-black" />
                                        <span className="text-white-dark">Subscribe to weekly newsletter</span>
                                    </label>
                                </div> */}
                                <button type="submit" disabled={false} className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                                    {!isLoading ? 'Sign in' : 'Loading...'}
                                </button>
                                {/* {mode !== '' && ( */}
                                {mode !== '' && (
                                    <button
                                        type="button"
                                        onClick={handleBack}

                                        className="mt-4 w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-semibold uppercase text-gray-700  hover:bg-gray-50 transition duration-150"
                                    >
                                        Back
                                    </button>

                                )}
                            </form>

                            {/* <div className="relative my-7 text-center md:mb-9">
                                <span className="absolute inset-x-0 top-1/2 h-px w-full -translate-y-1/2 bg-white-light dark:bg-white-dark"></span>
                                <span className="relative bg-white px-2 font-bold uppercase text-white-dark dark:bg-dark dark:text-white-light">or</span>
                            </div> */}
                            <div className="mb-10 md:mb-[60px]">
                                {/* <ul className="flex justify-center gap-3.5 text-white">
                                    <li>
                                        <Link
                                            to="#"
                                            className="inline-flex h-8 w-8 items-center justify-center rounded-full p-0 transition hover:scale-110"
                                            style={{ background: 'linear-gradient(135deg, rgba(239, 18, 98, 1) 0%, rgba(67, 97, 238, 1) 100%)' }}
                                        >
                                            <IconInstagram />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="#"
                                            className="inline-flex h-8 w-8 items-center justify-center rounded-full p-0 transition hover:scale-110"
                                            style={{ background: 'linear-gradient(135deg, rgba(239, 18, 98, 1) 0%, rgba(67, 97, 238, 1) 100%)' }}
                                        >
                                            <IconFacebookCircle />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="#"
                                            className="inline-flex h-8 w-8 items-center justify-center rounded-full p-0 transition hover:scale-110"
                                            style={{ background: 'linear-gradient(135deg, rgba(239, 18, 98, 1) 0%, rgba(67, 97, 238, 1) 100%)' }}
                                        >
                                            <IconTwitter fill={true} />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="#"
                                            className="inline-flex h-8 w-8 items-center justify-center rounded-full p-0 transition hover:scale-110"
                                            style={{ background: 'linear-gradient(135deg, rgba(239, 18, 98, 1) 0%, rgba(67, 97, 238, 1) 100%)' }}
                                        >
                                            <IconGoogle />
                                        </Link>
                                    </li>
                                </ul> */}
                            </div>
                            {/* <div className="text-center dark:text-white">
                                Don't have an account ?&nbsp;
                                <Link to="/auth/boxed-signup" className="uppercase text-primary underline transition hover:text-black dark:hover:text-white">
                                    SIGN UP
                                </Link>
                            </div> */}
                            {/* <div className="text-center dark:text-white">
                                Forget Password ?&nbsp;
                                <Link to="/auth/boxed-password-reset" className=" text-primary underline transition hover:text-black dark:hover:text-white">
                                    Reset Password
                                </Link>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginBoxed;
