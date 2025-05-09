import { Button } from "@/components/ui/Button";
import { IUserFilters } from "@/types/gift";
import { toast } from "react-toastify";

interface FilterActionsProps {
    selectedParameters: IUserFilters[];
    onFiltersChange: (filters: IUserFilters[]) => void;
}

export const FilterActions: React.FC<FilterActionsProps> = ({
    selectedParameters,
    onFiltersChange
}) => {
    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const jsonData = JSON.parse(e.target?.result as string);
                if (Array.isArray(jsonData)) {
                    onFiltersChange(jsonData);
                    toast.success('Фильтры успешно загружены!');
                } else {
                    toast.error('Неверный формат файла. Ожидается массив фильтров.');
                }
            } catch (error) {
                toast.error('Ошибка при чтении файла. Проверьте формат JSON.');
            }
        };
        reader.readAsText(file);
    };

    const handleExportFilters = () => {
        const jsonString = JSON.stringify(selectedParameters, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'filters.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="flex flex-row sm:flex-row *:w-full gap-4 mb-2">
            <div className="relative">
                <input
                    type="file"
                    accept=".json"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                />
                <Button
                    text="Загрузить"
                    color="green"
                    className="w-full"
                    FC={() => document.getElementById('file-upload')?.click()}
                />
            </div>
            <Button
                text="Экспорт"
                color="blue"
                FC={handleExportFilters}
                className="w-full sm:w-auto"
            />
        </div>
    );
}; 