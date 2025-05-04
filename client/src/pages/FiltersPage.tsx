import { FilterActions } from "@/components/filter/FilterActions";
import { Block } from "@/components/layout/Block";
import { PageContainer } from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/Button";
import { GiftService } from "@/services/gift.service";
import { onRequest } from "@/types";
import { IUserFilters } from "@/types/gift";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface GiftModel {
    id: string;
    name: string;
    models: Record<string, any>;
    backgrounds: Record<string, any>;
    symbols: any;
}

interface FilterOption {
    key: string;
    value: any;
}

type acceptableTypes = 'models' | 'backgrounds' | 'symbols'




interface MultiSelectModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    options: FilterOption[];
    selectedValues: string[];
    onChange: (values: string[]) => void;
}



const MultiSelectModal: React.FC<MultiSelectModalProps> = ({
    isOpen,
    onClose,
    title,
    options,
    selectedValues,
    onChange
}) => {
    const [search, setSearch] = useState("");
    const [localSelected, setLocalSelected] = useState<string[]>(selectedValues);

    console.log('selectedValues:', selectedValues)

    useEffect(() => {
        setLocalSelected(selectedValues);
    }, [selectedValues]);

    const parsePercentage = (value: string): number => {
        const match = value.match(/\((\d+(?:\.\d+)?)%\)/);
        return match ? parseFloat(match[1]) : 100;
    };

    const sortOptions = (options: FilterOption[]) => {
        return [...options]
            .filter(option => {
                const optionValue = String(option.value);
                return !optionValue.toLowerCase().includes('all');
            })
            .sort((a, b) => {
                const valueA = String(a.value);
                const valueB = String(b.value);
                const percentA = parsePercentage(valueA);
                const percentB = parsePercentage(valueB);

                if (percentA === percentB) {
                    return valueA.localeCompare(valueB);
                }
                return percentA - percentB;
            });
    };

    const filteredOptions = sortOptions(options.filter(option => {
        const optionValue = typeof option.value === 'string'
            ? option.value.toLowerCase()
            : JSON.stringify(option.value).toLowerCase();
        return optionValue.includes(search.toLowerCase());
    }));

    const handleToggle = (key: string) => {
        const newSelected = localSelected.includes(key)
            ? localSelected.filter(k => k !== key)
            : [...localSelected, key];
        setLocalSelected(newSelected);
    };

    const handleApply = () => {
        onChange(localSelected);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg w-full max-w-md mx-4">
                <div className="flex items-center justify-between p-4 border-b border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-200">{title}</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-300"
                    >
                        ✕
                    </button>
                </div>
                <div className="p-4">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Поиск..."
                        className="w-full bg-gray-700 text-white rounded px-3 py-2 mb-4 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="max-h-96 overflow-y-auto">
                        {filteredOptions.map(option => (
                            <div
                                key={option.key}
                                className="flex items-center p-2 hover:bg-gray-700/50 rounded cursor-pointer"
                                onClick={() => handleToggle(option.value)}
                            >
                                <input
                                    type="checkbox"
                                    checked={localSelected.includes(option.value)}
                                    onChange={() => { }}
                                    className="mr-3"
                                />
                                <span className="text-gray-300">
                                    {String(option.value)}
                                </span>
                            </div>
                        ))}
                        {filteredOptions.length === 0 && (
                            <div className="text-center py-4 text-gray-400">
                                Ничего не найдено
                            </div>
                        )}
                    </div>
                </div>
                <div className="p-1 border-t border-gray-700 flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-300 hover:text-white"
                    >
                        Отмена
                    </button>
                    <button
                        onClick={handleApply}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Применить
                    </button>
                </div>
            </div>
        </div>
    );
};

const FiltersPage: React.FC = () => {
    const [giftModels, setGiftModels] = useState<GiftModel[]>([]);
    const [filteredNfts, setFilteredNfts] = useState<GiftModel[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedParameters, setSelectedParameters] = useState<IUserFilters[]>([]);
    const [applying, setApplying] = useState(false);
    const [activeModal, setActiveModal] = useState<{
        type: acceptableTypes | 'nfts'
        nftName?: string;
    } | null>(null);

    const fetchGiftModels = async () => {
        setLoading(true);
        try {
            const data: { models: any, filters: IUserFilters[] } = await onRequest(GiftService.getGiftModels());

            console.log(data)
            if (data) {
                const sortedData = [...data.models].sort((a, b) => a.name.localeCompare(b.name));
                setGiftModels(sortedData);
                setFilteredNfts(sortedData);

                // _______


                setSelectedParameters(data.filters);
                console.log(data.filters)


            }
        } catch (error) {
            console.error('Ошибка при загрузке моделей:', error);
        }
        setLoading(false);
    };



    useEffect(() => {
        fetchGiftModels();
    }, []);

    const handleNftToggle = (nftName: string) => {
        setSelectedParameters(prev => {
            const isSelected = prev.some(p => p.nft === nftName);
            if (isSelected) {
                return prev.filter(p => p.nft !== nftName);
            } else {
                return [...prev, { nft: nftName, models: [], backgrounds: [], symbols: [] }];
            }
        });
    };

    const handleParameterChange = (nftName: string, type: acceptableTypes, values: string[]) => {
        setSelectedParameters(prev =>
            prev.map(p =>
                p.nft === nftName
                    ? { ...p, [type]: values }
                    : p
            )
        );
    };

    const parsePercentage = (value: string): number => {
        const match = value.match(/\((\d+(?:\.\d+)?)%\)/);
        return match ? parseFloat(match[1]) : 100;
    };

    const sortOptions = (options: FilterOption[]) => {
        return [...options]
            .filter(option => {
                const optionValue = String(option.value);
                return !optionValue.toLowerCase().includes('all');
            })
            .sort((a, b) => {
                const valueA = String(a.value);
                const valueB = String(b.value);
                const percentA = parsePercentage(valueA);
                const percentB = parsePercentage(valueB);

                if (percentA === percentB) {
                    return valueA.localeCompare(valueB);
                }
                return percentA - percentB;
            });
    };

    const getOptionsForNft = (nftName: string, type: acceptableTypes) => {
        const gift = giftModels.find(g => g.name === nftName);
        if (!gift) return [];

        return sortOptions(
            Object.entries(gift[type] || {})
                .map(([key, value]) => ({
                    key,
                    value
                }))
        );
    };

    const randInt = (min: number, max: number) => {
        return Math.floor(min + Math.random() * (max - min))
    }

    const getValueName = (nftName: string, type: acceptableTypes, key: string) => {
        const gift = giftModels.find(g => g.name === nftName);
        if (!gift) return key;
        return gift[type][key] || key;
    };

   

    const renderNftSelector = () => (
        <div className="bg-gray-800 rounded-lg p-0 mb-6">
            <h3 className="text-lg font-semibold text-gray-300 mb-3">Выберите NFT</h3>
            <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Выбрано: {selectedParameters.length}</span>
                <button
                    onClick={() => setActiveModal({ type: 'nfts' })}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                >
                    Выбрать
                </button>
            </div>
            {selectedParameters.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                    {selectedParameters.map(params => (
                        <span
                            key={params.nft}
                            className="bg-blue-500/20 text-sm text-gray-300 px-3 py-1.5 rounded flex items-center gap-2"
                        >
                            {params.nft}
                            <button
                                onClick={() => handleNftToggle(params.nft)}
                                className="text-red-400 hover:text-red-300 text-sm"
                            >
                                ✕
                            </button>
                        </span>
                    ))}
                </div>
            )}
        </div>
    );

    async function previewLottieAnimation(name: string, id: string): Promise<void> {
        try {
            const formattedName = name
                .replace(" ", "")
                .replace("-", "")
                .replace("'", "")
                .toLowerCase();
            
            const url = `https://nft.fragment.com/gift/${formattedName}-${id}.lottie.json`;
            
            console.log('URL запроса:', url);
            
            const response = await fetch(url);
            
            if (!response.ok) {
                console.error(`Ошибка HTTP: ${response.status}`);
                return;
            }
            
            const animationData = await response.json();
            console.log('Данные анимации:', animationData);
            
        } catch (error) {
            console.error('Ошибка при получении анимации:', error);
        }
    }

    const renderParameterSelectors = () => (


        <div className="flex flex-col h-full space-y-4">
            {selectedParameters.map(params => {
                const modelOptions = getOptionsForNft(params.nft, 'models');
                // const backgroundOptions = getOptionsForNft(params.nft, 'backgrounds');

                // console.log(params, modelOptions[randInt(0, modelOptions.length - 1)])

                // console.log(previewLottieAnimation(params.nft, String(randInt(0, 10))))

                // useEffect(() => {


                // }, [])

                const renderParameterTags = (items: string[], type: acceptableTypes) => {
                    if (items.length === 0) return null;

                    const visibleItems = items.slice(0, 2);
                    const remainingCount = items.length - 2;

                    return (
                        <div className="flex flex-wrap gap-2 items-center">
                            {visibleItems.map(item => (
                                <span key={item} className="bg-blue-500/20 text-sm text-gray-300 px-3 py-1.5 rounded">
                                    {getValueName(params.nft, type, item)}
                                </span>
                            ))}
                            {remainingCount > 0 && (
                                <span className="text-gray-400 text-sm">
                                    +{remainingCount} еще
                                </span>
                            )}
                        </div>
                    );
                };

                return (
                    <Block key={params.nft} className="p-2">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-300">
                                {params.nft}
                            </h3>
                            <button
                                onClick={() => handleNftToggle(params.nft)}
                                className="text-red-400 hover:text-red-300 text-sm"
                            >
                                Удалить
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-gray-800/50 rounded-lg p-3">
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-gray-400 text-sm">Модели</label>
                                    <button
                                        onClick={() => setActiveModal({ type: 'models', nftName: params.nft })}
                                        className="px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                                    >
                                        Выбрать ({params.models.length})
                                    </button>
                                </div>
                                {renderParameterTags(params.models, 'models')}
                            </div>
                            <div className="bg-gray-800/50 rounded-lg p-3">
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-gray-400 text-sm">Фоны</label>
                                    <button
                                        onClick={() => setActiveModal({ type: 'backgrounds', nftName: params.nft })}
                                        className="px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                                    >
                                        Выбрать ({params.backgrounds.length})
                                    </button>
                                </div>
                                {renderParameterTags(params.backgrounds, 'backgrounds')}
                            </div>

                            {/* <div className="bg-gray-800/50 rounded-lg p-3">
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-gray-400 text-sm">Символы</label>
                                    <button
                                        onClick={() => setActiveModal({ type: 'symbols', nftName: params.nft })}
                                        className="px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                                    >
                                        Выбрать ({params.symbols.length})
                                    </button>
                                </div>
                                {renderParameterTags(params.symbols, 'symbols')}
                            </div> */}
                        </div>
                    </Block>
                );
            })}
        </div>

    );


    const handleApplyFilters = async () => {
        setApplying(true);
        try {
            const parametersWithNames = selectedParameters.map(params => ({
                nft: params.nft,
                models: params.models.map(key => getValueName(params.nft, 'models', key)),
                backgrounds: params.backgrounds.map(key => getValueName(params.nft, 'backgrounds', key)),
                symbols: params.symbols.map(key => getValueName(params.nft, 'symbols', key))
            }));

            console.log('Применяем фильтры:', parametersWithNames);
            const data: { count: number } = await onRequest(GiftService.applyFilters({ filters: parametersWithNames }));


            if (data) {
                toast.success(`Фильтры (${data.count}) успешно применины!`)

            }




            console.log('Ответ от сервера:', data);

            await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error) {
            console.error('Ошибка при применении фильтров:', error);
        } finally {
            setApplying(false);
        }
    };


    return (
        <PageContainer className="pt-0">
            <div className="flex flex-col w-full h-full max-w-6xl mx-auto">
                {loading ? (
                    <div className="text-center py-4">
                        <p className="text-gray-400">Загрузка...</p>
                    </div>
                ) : (
                    <>
                        <FilterActions
                            selectedParameters={selectedParameters}
                            onFiltersChange={setSelectedParameters}
                        />

                        
                        {renderNftSelector()}
                        {selectedParameters.length > 0 && renderParameterSelectors()}

                        {activeModal && (
                            <MultiSelectModal
                                isOpen={true}
                                onClose={() => setActiveModal(null)}
                                title={
                                    activeModal.type === 'nfts' ? 'Выберите NFT' :
                                        activeModal.type === 'models' ? 'Выберите модели' :
                                            activeModal.type === 'backgrounds' ? 'Выберите фоны' :
                                                'Выберите символы'
                                }
                                options={
                                    activeModal.type === 'nfts'
                                        ? sortOptions(giftModels.map(model => ({
                                            key: model.name,
                                            value: model.name
                                        })))
                                        : getOptionsForNft(activeModal.nftName!, activeModal.type as 'models' | 'backgrounds' | 'symbols')
                                }
                                selectedValues={
                                    activeModal.type === 'nfts'
                                        ? selectedParameters.map(p => p.nft)
                                        : selectedParameters.find(p => p.nft === activeModal.nftName)?.[activeModal.type] || []
                                }
                                onChange={(values) => {
                                    if (activeModal.type === 'nfts') {
                                        const currentNfts = selectedParameters.map(p => p.nft);
                                        const toAdd = values.filter(v => !currentNfts.includes(v));
                                        const toRemove = currentNfts.filter(v => !values.includes(v));

                                        toAdd.forEach(nft => handleNftToggle(nft));
                                        toRemove.forEach(nft => handleNftToggle(nft));
                                    } else {
                                        handleParameterChange(
                                            activeModal.nftName!,
                                            activeModal.type as 'models' | 'backgrounds' | 'symbols',
                                            values
                                        );
                                    }
                                    setActiveModal(null);
                                }}
                            />
                        )}


                        <div className="mt-6 flex justify-center">
                            <button
                                onClick={handleApplyFilters}
                                disabled={applying}
                                className={`px-6 py-3 rounded-lg text-white font-semibold ${applying
                                    ? 'bg-blue-500/50 cursor-not-allowed'
                                    : 'bg-blue-500 hover:bg-blue-600'
                                    }`}
                            >
                                {applying ? 'Применение...' : 'Применить фильтры'}
                            </button>
                        </div>

                    </>
                )}
            </div>
        </PageContainer>
    );
};

export default FiltersPage;
