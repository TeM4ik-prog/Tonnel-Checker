import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { ReactNode, useState } from 'react';
import { Button } from './Button';

interface Props {
  title: string;
  buttonFC: any;
  content: string;
  buttonOpenText: string;
  buttonCloseText: string;
  buttonColor: 'red' | 'blue';
  icon?: ReactNode;
  children?: ReactNode;
}

export const Modal = ({ title, buttonOpenText, buttonCloseText, buttonColor, content, children, buttonFC, icon }: Props) => {
  let [isOpen, setIsOpen] = useState(false)

  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }

  return (
    <>
      <Button
        text={buttonOpenText}
        FC={open}
        color={buttonColor}
        icon={icon}
      />

      <AnimatePresence>
        {isOpen && (
          <Dialog 
            open={isOpen} 
            as="div" 
            className="relative z-50" 
            onClose={close}
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
                    <DialogTitle as="h3" className="flex flex-row justify-between items-center text-2xl font-semibold text-white mb-4">
                      {title}
                      <button
                        onClick={close}
                        className="p-2 rounded-full hover:bg-gray-800 transition-colors duration-200"
                      >
                        <X className="w-5 h-5 text-gray-400 hover:text-white transition-colors duration-200" />
                      </button>
                    </DialogTitle>

                    <div className="space-y-4">
                      <p className="text-lg text-gray-300 leading-relaxed">
                        {content}
                      </p>
                      {children}
                    </div>

                    <div className="mt-8 flex justify-end gap-3">
                      <Button
                        text="Отмена"
                        color="blue"
                        FC={close}
                        className="opacity-80 hover:opacity-100 transition-opacity duration-200"
                      />
                      <Button
                        text={buttonCloseText}
                        color={buttonColor}
                        FC={() => {
                          buttonFC();
                          close();
                        }}
                        icon={icon}
                        className="shadow-lg shadow-cyan-500/20"
                      />
                    </div>
                  </DialogPanel>
                </motion.div>
              </div>
            </motion.div>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  )
}
