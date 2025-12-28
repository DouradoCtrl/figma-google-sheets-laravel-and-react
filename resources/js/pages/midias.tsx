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
                {Array.isArray(sheetsData?.original) && sheetsData.original.length > 1 && (
                    <>
                        <div className="flex justify-end mb-2">
                            <button
                                className="inline-flex items-center px-4 py-2 text-sm font-medium rounded bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                                onClick={() => alert('Adicionar novo item')}
                            >
                                Adicionar
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full rounded-xl overflow-hidden border border-sidebar-border/70 bg-background dark:bg-background-dark">
                                <thead>
                                    <tr>
                                        {sheetsData.original[0].map((header: string, idx: number) => (
                                            <th
                                                key={idx}
                                                className="px-4 py-2 border-b border-sidebar-border/70 text-left font-bold bg-muted dark:bg-muted-dark first:rounded-tl-xl"
                                            >
                                                {header}
                                            </th>
                                        ))}
                                        <th className="px-4 py-2 border-b border-sidebar-border/70 text-left font-bold bg-muted dark:bg-muted-dark last:rounded-tr-xl w-20 text-center">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sheetsData.original.slice(1).map((row: any[], rowIdx: number) => (
                                        <tr
                                            key={rowIdx}
                                            className="hover:bg-accent dark:hover:bg-accent-dark"
                                        >
                                            {row.map((cell, cellIdx) => {
                                                // Detecta se é a coluna "Fundo" para exibir imagem
                                                const header = sheetsData.original[0][cellIdx];
                                                const isFundo = header === 'Fundo';
                                                const isCor = header === 'Cor';
                                                return (
                                                    <td
                                                        key={cellIdx}
                                                        className="px-4 py-2 border-b border-muted dark:border-muted-dark"
                                                    >
                                                        {isFundo ? (
                                                            <img
                                                                src={cell}
                                                                alt="Fundo"
                                                                className="w-16 h-16 object-cover rounded-md border border-muted"
                                                            />
                                                        ) : isCor ? (
                                                            typeof cell === 'string' ? (
                                                                <span
                                                                    className="inline-block px-2 py-1 rounded text-xs font-semibold border border-muted"
                                                                    style={{ background: cell.replace(/^\//, ''), color: '#222', minWidth: 60, textAlign: 'center' }}
                                                                >
                                                                    {cell.replace(/^\//, '')}
                                                                </span>
                                                            ) : cell
                                                        ) : (
                                                            cell
                                                        )}
                                                    </td>
                                                );
                                            })}
                                            <td className="px-4 py-2 border-b border-muted dark:border-muted-dark text-center align-middle">
                                                <div className="flex flex-row items-center justify-center gap-2">
                                                    <button
                                                        className="inline-flex items-center justify-center p-1 rounded-full border border-muted bg-muted dark:bg-muted-dark hover:bg-accent/60 dark:hover:bg-accent-dark/60 transition-colors shadow-sm"
                                                        title="Editar"
                                                        onClick={() => alert(`Editar linha ${rowIdx + 1}`)}
                                                    >
                                                        {/* Ícone de lápis (editar) */}
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-zinc-700 dark:text-zinc-200">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.862 5.487a2.1 2.1 0 1 1 2.97 2.97l-9.193 9.193a2 2 0 0 1-.707.464l-3.11 1.037a.5.5 0 0 1-.633-.633l1.037-3.11a2 2 0 0 1 .464-.707l9.193-9.193z" />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        className="inline-flex items-center justify-center p-1 rounded-full border border-muted bg-muted dark:bg-muted-dark hover:bg-red-100 dark:hover:bg-red-900 transition-colors shadow-sm"
                                                        title="Excluir"
                                                        onClick={() => alert(`Excluir linha ${rowIdx + 1}`)}
                                                    >
                                                        {/* Ícone de lixeira (excluir) */}
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-red-600 dark:text-red-400">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0 1 16.138 21H7.862a2 2 0 0 1-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </div>
        </AppLayout>
    );
}
