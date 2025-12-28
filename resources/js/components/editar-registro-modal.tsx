import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';

interface EditarRegistroModalProps {
  open: boolean;
  onClose: () => void;
  row: any[] | null;
  headers: string[];
  categoreData: any;
  onSave?: (data: Record<string, any>) => void;
}

export function EditarRegistroModal({ open, onClose, row, headers, categoreData, onSave }: EditarRegistroModalProps) {
  const [form, setForm] = useState<Record<string, any>>({});

  useEffect(() => {
    if (row && headers) {
      const initial: Record<string, any> = {};
      headers.forEach((h, i) => {
        initial[h] = row[i] ?? '';
      });
      setForm(initial);
    }
  }, [row, headers]);

  // Atualiza cor automaticamente ao mudar categoria
  useEffect(() => {
    if (form['categoriaMenu'] && categoreData?.original) {
      const found = categoreData.original.find((item: any[], idx: number) => idx > 0 && item[0] === form['categoriaMenu']);
      if (found) {
        setForm((prev) => ({ ...prev, Cor: found[1] }));
      }
    }
  }, [form['categoriaMenu'], categoreData]);

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSave) onSave(form);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Editar Registro</DialogTitle>
          <DialogDescription>Altere os campos desejados e salve as mudanças.</DialogDescription>
        </DialogHeader>
        {row && headers && (
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            {headers.map((header) => {
              if (header === 'Categoria') {
                return (
                  <div key={header} className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-muted-foreground">Categoria</label>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={form['categoriaMenu'] ?? ''}
                      onChange={e => handleChange('categoriaMenu', e.target.value)}
                      name="categoriaMenu"
                      required
                    >
                      <option value="">Selecione uma categoria</option>
                      {Array.isArray(categoreData?.original) && categoreData.original.slice(1).map((item: any[]) => (
                        <option key={item[0]} value={item[0]}>{item[0]}</option>
                      ))}
                    </select>
                  </div>
                );
              } else if (header === 'Cor') {
                const corValue = (form['Cor'] ?? '').replace(/^\//, '');
                return (
                  <div key={header} className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-muted-foreground">Cor</label>
                    <Input
                      value={corValue}
                      className="font-mono"
                      type="text"
                      name="Cor"
                      disabled
                      style={{ background: corValue || undefined, color: '#fff' }}
                    />
                  </div>
                );
              } else {
                return (
                  <div key={header} className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-muted-foreground">{header}</label>
                    <Input
                      value={form[header] ?? ''}
                      onChange={e => handleChange(header, e.target.value)}
                      className=""
                      type="text"
                      name={header}
                      placeholder={`Digite ${header.toLowerCase()}`}
                    />
                  </div>
                );
              }
            })}
            <div className="flex justify-end gap-2 mt-4">
              <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
              <Button type="submit" variant="default">Salvar</Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
