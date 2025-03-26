import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from './Button';
import { Input } from './Input';

interface Props {
    title: string;
    buttonOpenText: string;
    buttonCloseText?: string;
    buttonColor: 'red' | 'blue';
    isOpen: boolean;
    onClose: () => void;
    code: string;
    setCode: (value: string) => void;
    IsValidCodeFrom: () => boolean;
    verifyCodeHandler: () => void;
}

export const ModalCheckCode = ({
    title,
    buttonOpenText,
    buttonCloseText,
    buttonColor,
    isOpen,
    onClose,
    code,
    setCode,
    IsValidCodeFrom,
    verifyCodeHandler
}: Props) => {

    return (
        <AnimatePresence>
            {isOpen && (
                <Dialog 
                    open={isOpen} 
                    as="div" 
                    className="relative z-50" 
                    onClose={onClose}
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                    >
                        <div className="fixed inset-0 flex items-center justify-center p-4">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                className="w-full max-w-md bg-gray-900/95 rounded-2xl p-6 shadow-2xl border border-gray-700/50 backdrop-blur-md"
                            >
                                <DialogPanel>
                                    <DialogTitle as="h3" className="flex flex-row justify-between items-center text-2xl font-semibold text-white mb-6">
                                        {title}
                                        <button
                                            onClick={onClose}
                                            className="p-2 rounded-full hover:bg-gray-800 transition-colors duration-200"
                                        >
                                            <X className="w-5 h-5 text-gray-400 hover:text-white transition-colors duration-200" />
                                        </button>
                                    </DialogTitle>

                                    <div className="space-y-4">
                                        <div className='flex flex-row gap-3 w-full'>
                                            <Input
                                                name='text'
                                                type="text"
                                                value={code}
                                                onChange={(e) => setCode(e.target.value)}
                                                placeholder="Введите код с почты"
                                                className="flex-1"
                                            />

                                            <Button 
                                                text='Подтвердить'
                                                FC={() => {
                                                    if (IsValidCodeFrom()) {
                                                        verifyCodeHandler();
                                                    }
                                                }}
                                                widthMin={true}
                                                disabled={!IsValidCodeFrom()}
                                                className="shadow-lg shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                                            />
                                        </div>

                                        {buttonCloseText && (
                                            <div className="mt-6 flex justify-end">
                                                <Button
                                                    text={buttonCloseText}
                                                    color={buttonColor}
                                                    FC={onClose}
                                                    className="opacity-80 hover:opacity-100 transition-opacity duration-200"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </DialogPanel>
                            </motion.div>
                        </div>
                    </motion.div>
                </Dialog>
            )}
        </AnimatePresence>
    )
}
