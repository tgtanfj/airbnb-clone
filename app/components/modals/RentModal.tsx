'use client'

import useRentModal from "@/app/hooks/useRentModal"
import Modal from "./Modal"
import { useMemo, useState } from "react"
import Heading from "../Heading"
import { categories } from "../navbar/Categories"
import Categoryinput from "../inputs/Categoryinput"
import { FieldValues, useForm } from "react-hook-form"

enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTIONS = 4,
    PRICE = 5
}

const RentModal = () => {
    const rentModal = useRentModal()

    const [step, setStep] = useState(STEPS.CATEGORY)

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: '',
            price: 1,
            title: '',
            description: ''
        }
    })

    const category = watch('category')

    const setCustomValue = (id: string, value:any)

    const onBack = () => {
        setStep((value) => value - 1)
    }

    const onNext = () => {
        setStep((value) => value + 1)
    }

    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE) {
            return 'Create'
        }

        return 'Next'
    }, [step])

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return undefined
        }

        return 'BACK'
    }, [step])

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Which of these best descrives your places"
                subtitle="Pick a category"
            />
            <div className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-3
            max-h-[50vh]
            overflow-y-auto
            ">
                {categories.map((item) => (
                    <Categoryinput
                        onClick={() => { }}
                        selected={false}
                        label={item.label}
                        icon={item.icon}
                    />
                ))}
            </div>
        </div>
    )

    return (
        <Modal
            isOpen={rentModal.isOpen}
            onClose={rentModal.onClose}
            onSubmit={rentModal.onClose}
            actionLabel={actionLabel}
            secondaryActionLable={secondaryActionLabel}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
            title="Airbnb your home!"
            body={bodyContent}
        />
    )
}

export default RentModal