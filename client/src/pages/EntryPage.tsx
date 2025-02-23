import { RegistrationGoogleButton } from "@/components/shared/authButtons/googleButton/googleButton";
import TelegramLoginButton from "@/components/shared/authButtons/tgButton/tgButton";
import { Button } from "@/components/ui/Button"
import { Modal } from "@/components/ui/Dialog";
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
            <div className="bg-gray-700 p-5 rounded-lg min-w-max w-10/12 lg:w-2/5">
                <div className="w-full flex flex-row justify-start gap-3 mb-3">
                    <img src="icons/telegram.svg" />
                    <img src="icons/google.svg" />

                    <h2 className="text-2xl text-center font-bold text-cyan-200">Авторизация</h2>


                </div>


                <form onSubmit={entryHandler} className="flex flex-col gap-3">
                    <Input
                        name="email"
                        type='email'
                        placeholder="E-mail"
                        onChange={changeEmailHandler}
                        value={email}
                    />

                    {needToCheckPassword && (
                        <Input name="password"
                            type="password"
                            placeholder="Пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                    )}

                    {!isCodeVerified ? (
                        <>
                            {isEmailSending ? (
                                <Button formSubmit={true} text="Идет отправка кода..." />
                            ) : (
                                <Button formSubmit={true} text="Отправить код" />
                            )}
                        </>
                    ) : (
                        <Button formSubmit={true} text="Войти" />
                    )}
                </form>

                <div className="flex flex-col gap-5 mt-5">
                    <div className="flex items-center justify-center">
                        <div className="flex-grow h-px bg-white opacity-50"></div>
                        <span className=" relative px-2 text-white font-semibold tracking-wide uppercase text-xs cursor-pointer group">
                            Другие способы входа
                        </span>
                        <div className="flex-grow h-px bg-white opacity-50"></div>
                    </div>

                    <div className="flex flex-col gap-4 items-center">
                        <TelegramLoginButton
                            botName={TelegramBot}
                            buttonSize="large"
                            cornerRadius={3}
                            usePic={false}
                            dataOnauth={EntryByTelegram}
                            className="telegram-login-container"
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



        </Section >
    )
}

export default EntryPage