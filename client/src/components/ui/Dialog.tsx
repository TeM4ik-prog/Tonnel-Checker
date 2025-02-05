import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'
import { Button } from './Button';

interface Props {
  title: string;
  buttonFC: any;
  content: string;
  buttonOpenText: string;
  buttonCloseText: string;
  buttonColor: 'red' | 'blue';

  children?: React.ReactNode;

}

export const Modal = ({ title, buttonOpenText, buttonCloseText, buttonColor, content, children, buttonFC }: Props) => {
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

      />

      <Dialog open={isOpen} as="div" className="relative z-50 focus:outline-none " onClose={close}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center backdrop-blur-sm z-0 p-4">
            <DialogPanel
              transition
              className="w-full max-w-md bg-gray-900 rounded-2xl p-6 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle as="h3" className="text-2xl font-medium  text-white">
                {title}
              </DialogTitle>
              <p className="mt-2 text-1xl text-white/50">
                {content}
              </p>

              {children}

              
              <div className="mt-4">
                <Button text={buttonCloseText} color={buttonColor}
                  FC={() => {
                    buttonFC()
                    close()
                  }}
                />
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}
