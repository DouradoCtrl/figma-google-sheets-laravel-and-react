import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { midias } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Mídias',
        href: midias().url,
    },
];

type MediasProps = {
    sheetsData: any;
};

export default function Dashboard({ sheetsData }: MediasProps) {
    return (    
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Mídias" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* Tabela com os dados da planilha */}
                {Array.isArray(sheetsData?.original) && sheetsData.original.length > 1 && (
                    <div className="overflow-x-auto">
                        <table className="min-w-full rounded-xl overflow-hidden border border-sidebar-border/70 bg-background dark:bg-background-dark">
                            <thead>
                                <tr>
                                    {sheetsData.original[0].map((header: string, idx: number) => (
                                        <th
                                            key={idx}
                                            className="px-4 py-2 border-b border-sidebar-border/70 text-left font-bold bg-muted dark:bg-muted-dark first:rounded-tl-xl last:rounded-tr-xl"
                                        >
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {sheetsData.original.slice(1).map((row: any[], rowIdx: number) => (
                                    <tr
                                        key={rowIdx}
                                        className="hover:bg-accent dark:hover:bg-accent-dark"
                                    >
                                        {row.map((cell, cellIdx) => (
                                            <td
                                                key={cellIdx}
                                                className="px-4 py-2 border-b border-muted dark:border-muted-dark"
                                            >
                                                {cell}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
