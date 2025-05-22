import React from 'react'
import { MainNavigation } from './MainNavigation'
import { useAppSelector } from '../../../../store'
import { useAppDispatch } from '../../../../store/hooks';
import { editStaticComponentsService } from '../../../../store/services/pagesService';


const Header: React.FC = ({ labels, setLabels, selectedLang }) => {
    let lang = selectedLang?.value

    const { staticComp } = useAppSelector(state => state.pages);
    const header = staticComp?.filter((c) => c.language === selectedLang?.value)?.find((c) => c.type === 'header')

    const dispatch = useAppDispatch()


    return (
        <>
            <div className="flex w-full   flex-col items-stretch max-md:max-w-full mb-5">
                <MainNavigation isMobile={false} header={header} labels={labels} setLabels={setLabels} />
            </div>

        </>

    )
}

export default Header
