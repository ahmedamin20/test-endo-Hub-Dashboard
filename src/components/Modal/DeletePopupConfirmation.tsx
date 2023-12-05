import React from 'react'
import { useTranslations } from 'next-intl'
import { IoWarningOutline } from 'react-icons/io5'
import MainButton from '../MainButton'

function DeletePopupConfirmation({ id, setShowDeletePopup, deleteFunction }: { id: string | number, setShowDeletePopup: (state: boolean) => void, deleteFunction: any }) {
    const t = useTranslations()
    return (
        <div className='bg-gradient-to-b text-black from-[#1A202C66] to-[#1A202C66] fixed left-0 w-full top-0 min-h-screen z-10'>
            <div className='fixed top-[25%] w-[350px] text-center rounded-md p-[20px] left-[40%] bg-white flex flex-col gap-[10px]'>
                <IoWarningOutline color='red' size='35px' className=' my-[10px] flex items-center justify-center mx-auto' />

                <p className=''>{t('sure')}</p>
                <p className=' text-sm'>{t('noComeBack')}</p>
                <div className='flex mt-[10px] items-center justify-between'>
                    <button type='button'
                        style={{ background: 'red', color: 'white' }}
                        className='bg-red-500  border  w-[100px] h-[50px] rounded-md'
                        onClick={() => {
                            deleteFunction(id)
                            setShowDeletePopup(false)
                        }}
                    >{t('yes')}</button>

                    <div onClick={() => {
                        //  setId('')
                        setShowDeletePopup(false)
                    }}>
                        <MainButton type="button" className="form-submit-button text-white w-[100px] h-[50px] ">
                            {t('no')}
                        </MainButton>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeletePopupConfirmation