import { RegistrationGoogleButton } from "@/components/shared/authButtons/googleButton/googleButton";
import TelegramLoginButton from "@/components/shared/authButtons/tgButton/tgButton";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ModalCheckCode } from "@/components/ui/ModalCheckCode";
import { Section } from "@/components/ui/Section";
import { AuthService } from "@/services/auth.service";
import { login, updateData } from "@/store/user/user.slice";
import { TelegramBot } from "@/types";
import { IGoogleAuth, ITelegramAuth } from "@/types/auth";
import { RoutesConfig } from "@/types/pagesConfig";
import { handleError } from "@/utils/handleError";
import { setTokenToLocalStorage } from "@/utils/localstorage";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EntryPage = () => {
    const [isRegisterMode, setIsRegisterMode] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')


    const [isEmailSending, setIsEmailSending] = useState<boolean>(false)

    const [isVerifyCodeDialogOpen, setIsVerifyCodeDialogOpen] = useState<boolean>(false)

    const [code, setCode] = useState<string>('')
    const [userId, setUserId] = useState<string>()

    const [needToCheckPassword, setNeedToCheckPassword] = useState<boolean>(false)

    const [isCodeVerified, setIsCodeVerified] = useState(false)



    const sendCodeHandler = async () => {
        setIsEmailSending(true)
        try {
            const data = await AuthService.Email.sendCode(email)

            console.log(data)
            if (data) {
                if (data.verified) {
                    setIsCodeVerified(true)
                    return
                }
                else if (data.checkPassword) {
                    setIsEmailSending(false)
                    setNeedToCheckPassword(true)
                    setIsCodeVerified(true)
                    return
                }
                setIsVerifyCodeDialogOpen(true)
                setUserId(data.userId)
            }
        } catch (err) {
            setIsEmailSending(false)
            // toast.error('Email is not exists')
        }
    }

    const verifyCodeHandler = async () => {
        try {
            if (!userId) return
            const data = await AuthService.Email.verifyCode(userId, code)
            console.log(data)
            if (data) {
                setIsEmailSending(false)
                setIsVerifyCodeDialogOpen(false)
                setIsCodeVerified(true)
                toast.success('Correct code')
                handleEntryData(data)
            }
        } catch (err) {
            toast.error(handleError(err))
        }
    }

    const changeEmailHandler = (e: any) => {
        if (!isCodeVerified) {
            setEmail(e.target.value)
        }
    }

    const loginAdmin = async () => {
        try {
            const data = await AuthService.Email.loginAdmin(email, password)
            console.log(data)
            handleEntryData(data)
        } catch (err) {
            toast.error(handleError(err))
        }
    }

    const loginUser = async () => {
        try {
            const data = await AuthService.Email.login(email)
            handleEntryData(data)
        } catch (err) {
            toast.error(handleError(err))
        }
    }

    const entryHandler = (e: any) => {
        e.preventDefault()
        if (!isCodeVerified) {
            if (isEmailSending) return
            sendCodeHandler()

            return
        }
        needToCheckPassword ? loginAdmin() : loginUser()
    }

    const IsValidCodeFrom = (): boolean => {
        if (code.length == 6) {
            return true
        }
        return false
    }


    const handleEntryData = (responseData: any) => {
        console.log(responseData)

        try {
            if (responseData) {
                dispatch(login(responseData))
                setTokenToLocalStorage(responseData.token)

                dispatch(updateData())
                toast.success('Вы успешно вошли!')
                navigate(RoutesConfig.PROFILE.path)
            }
        } catch (err) {
            toast.error(handleError(err));
        }
    }




    const EntryByTelegram = async (user: ITelegramAuth) => {
        console.log(user)


        try {
            const data = await AuthService.Telegram.login(user)
            console.log(data)
            handleEntryData(data)
        } catch (err) {
            toast.error(handleError(err))
        }

    }

    const EntryByGoogle = async (user: IGoogleAuth) => {

        console.log(user)

        try {
            const data = await AuthService.Google.login(user)
            console.log(data)
            handleEntryData(data)
        } catch (err) {
            toast.error(handleError(err))
        }


    }


    return (
        <Section>
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl shadow-2xl min-w-max w-10/12 lg:w-2/5 backdrop-blur-sm border border-gray-700">
                <div className="w-full flex flex-col items-center mb-8">
                    <div className="flex items-center gap-4 mb-4">
                        <img src="icons/telegram.svg" className="w-8 h-8 hover:scale-110 transition-transform duration-200" alt="Telegram" />
                        <img src="icons/google.svg" className="w-8 h-8 hover:scale-110 transition-transform duration-200" alt="Google" />
                    </div>
                    <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                        Авторизация
                    </h2>
                </div>

                <form onSubmit={entryHandler} className="flex flex-col gap-4">
                    <Input
                        name="email"
                        type='email'
                        placeholder="E-mail"
                        onChange={changeEmailHandler}
                        value={email}
                        className="bg-gray-700 border-gray-600 focus:border-cyan-500 focus:ring-cyan-500 text-white placeholder-gray-400"
                    />

                    {needToCheckPassword && (
                        <Input 
                            name="password"
                            type="password"
                            placeholder="Пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-gray-700 border-gray-600 focus:border-cyan-500 focus:ring-cyan-500 text-white placeholder-gray-400"
                        />
                    )}

                    {!isCodeVerified ? (
                        <>
                            {isEmailSending ? (
                                <Button 
                                    formSubmit={true} 
                                    text="Идет отправка кода..." 
                                    className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
                                />
                            ) : (
                                <Button 
                                    formSubmit={true} 
                                    text="Отправить код"
                                    className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
                                />
                            )}
                        </>
                    ) : (
                        <Button 
                            formSubmit={true} 
                            text="Войти"
                            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
                        />
                    )}
                </form>

                <div className="flex flex-col gap-6 mt-8">
                    <div className="flex items-center justify-center">
                        <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>
                        <span className="px-4 text-gray-400 font-medium text-sm">
                            Другие способы входа
                        </span>
                        <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>
                    </div>

                    <div className="flex flex-col gap-4 items-center">
                        <TelegramLoginButton
                            botName={TelegramBot}
                            buttonSize="large"
                            cornerRadius={8}
                            usePic={false}
                            dataOnauth={EntryByTelegram}
                            className="telegram-login-container hover:opacity-90 transition-opacity duration-200"
                        />

                        <RegistrationGoogleButton authHandler={EntryByGoogle} />
                    </div>
                </div>
            </div>

            <ModalCheckCode
                isOpen={isVerifyCodeDialogOpen}
                onClose={() => { setIsVerifyCodeDialogOpen(false), setIsEmailSending(false) }}
                title="Верификация"
                buttonOpenText="Открыть"
                buttonColor="blue"
                code={code}
                setCode={setCode}
                IsValidCodeFrom={IsValidCodeFrom}
                verifyCodeHandler={verifyCodeHandler}
            />
        </Section>
    )
}

export default EntryPage