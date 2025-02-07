import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { ReactNode, useState } from 'react'
import { Button } from './Button';

import { motion } from 'framer-motion'
import { X } from 'lucide-react';

interface Props {
  title: string;
  buttonFC: any;
  content: string;
  buttonOpenText: string;
  buttonCloseText: string;
  buttonColor: 'red' | 'blue';

  icon?: ReactNode

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

      <Dialog open={isOpen} as="div" className="relative z-50" onClose={close}>
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="w-full max-w-md bg-gray-900 rounded-2xl p-6 shadow-xl border border-gray-700"
          >
            <DialogPanel>
              <DialogTitle as="h3" className="flex flex-row justify-between text-2xl font-semibold text-white">
                {title}

                <X onClick={close}/>
              </DialogTitle>




              <p className="mt-2 text-lg text-white/60">
                {content}
              </p>
              {children}
              <div className="mt-6 flex justify-end">
                <Button
                  text={buttonCloseText}
                  color={buttonColor}
                  FC={() => {
                    buttonFC();
                    close();
                  }}
                  icon={icon}
                />
              </div>
            </DialogPanel>
          </motion.div>
        </div>
      </Dialog>
    </>
  )
}
