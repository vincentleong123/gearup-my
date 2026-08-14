'use client';

import { useState } from 'react';
import type { FieldDef } from '@/admin/types';

const inputCls =
  'w-full px-3 py-2 rounded-lg border border-zinc-200 text-sm bg-white text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100';

function Label({ field }: { field: FieldDef }) {
  return (
    <div className="mb-1.5">
      <label className="text-sm font-semibold text-zinc-700">
        {field.label}
        {field.required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {field.hint && <p className="text-xs text-zinc-400 mt-0.5">{field.hint}</p>}
    </div>
  );
}

function TextInput({ field, value, onChange }: Props) {
  return (
    <input
      type="text"
      value={typeof value === 'string' ? value : ''}
      onChange={e => onChange(e.target.value)}
      placeholder={field.placeholder}
      className={inputCls}
    />
  );
}

function TextArea({ field, value, onChange }: Props) {
  return (
    <textarea
      rows={3}
      value={typeof value === 'string' ? value : ''}
      onChange={e => onChange(e.target.value)}
      placeholder={field.placeholder}
      className={`${inputCls} resize-y`}
    />
  );
}

function NumberInput({ field, value, onChange }: Props) {
  const num = typeof value === 'number' ? value : undefined;
  return (
    <input
      type="number"
      value={num === undefined ? '' : num}
      onChange={e => onChange(e.target.value === '' ? undefined : Number(e.target.value))}
      placeholder={field.placeholder}
      className={inputCls}
    />
  );
}

function DateInput({ value, onChange }: Props) {
  const v = typeof value === 'string' ? value.slice(0, 10) : '';
  return <input type="date" value={v} onChange={e => onChange(e.target.value)} className={inputCls} />;
}

function BooleanInput({ field, value, onChange }: Props) {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <input
        type="checkbox"
        checked={value === true}
        onChange={e => onChange(e.target.checked)}
        className="h-4 w-4 accent-red-600"
      />
      <span className="text-sm text-zinc-700">{field.label}</span>
    </label>
  );
}

function SelectInput({ field, value, onChange }: Props) {
  return (
    <select value={typeof value === 'string' ? value : ''} onChange={e => onChange(e.target.value)} className={inputCls}>
      <option value="">—</option>
      {(field.options || []).map(o => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

function MultiSelect({ field, value, onChange }: Props) {
  const selected = Array.isArray(value) ? value.map(String) : [];
  const toggle = (o: string) => {
    const next = selected.includes(o) ? selected.filter(x => x !== o) : [...selected, o];
    onChange(next);
  };
  return (
    <div className="flex flex-wrap gap-1.5">
      {(field.options || []).map(o => {
        const on = selected.includes(o);
        return (
          <button
            key={o}
            type="button"
            onClick={() => toggle(o)}
            className={`px-2.5 py-1 rounded-full text-xs font-bold border transition-colors ${
              on ? 'bg-red-600 text-white border-red-600' : 'bg-white text-zinc-600 border-zinc-200 hover:border-red-300'
            }`}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}

function TagList({ field, value, onChange }: Props) {
  const tags = Array.isArray(value) ? value.map(String) : [];
  const [draft, setDraft] = useState('');
  const add = () => {
    const items = draft.split(',').map(t => t.trim()).filter(Boolean);
    if (items.length === 0) return;
    onChange([...new Set([...tags, ...items])]);
    setDraft('');
  };
  const remove = (t: string) => onChange(tags.filter(x => x !== t));
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1.5">
        {tags.map(t => (
          <span key={t} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-zinc-100 text-xs font-semibold text-zinc-700">
            {t}
            <button type="button" onClick={() => remove(t)} className="text-zinc-400 hover:text-red-500">
              ×
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ',') {
              e.preventDefault();
              add();
            }
          }}
          placeholder={field.placeholder || 'Type and press Enter (comma-separated ok)'}
          className={inputCls}
        />
        <button type="button" onClick={add} className="px-3 py-2 rounded-lg bg-zinc-100 text-zinc-700 text-sm font-semibold hover:bg-zinc-200">
          Add
        </button>
      </div>
    </div>
  );
}

function ObjectGroup({ field, value, onChange }: Props) {
  const obj = (value && typeof value === 'object' && !Array.isArray(value) ? value : {}) as Record<string, unknown>;
  const setNested = (key: string, v: unknown) => onChange({ ...obj, [key]: v });
  return (
    <div className="rounded-xl border border-zinc-200 bg-zinc-50/60 p-3 space-y-3">
      {(field.fields || []).map(f => (
        <FieldInput key={f.name} field={f} value={obj[f.name]} onChange={v => setNested(f.name, v)} />
      ))}
    </div>
  );
}

function ListOfObjects({ field, value, onChange }: Props) {
  const items = Array.isArray(value) ? (value as Record<string, unknown>[]) : [];
  const update = (idx: number, v: unknown) => onChange(items.map((it, i) => (i === idx ? v : it)));
  const remove = (idx: number) => onChange(items.filter((_, i) => i !== idx));
  const add = () => {
    const defaults: Record<string, unknown> = {};
    for (const f of field.fields || []) defaults[f.name] = f.defaultValue;
    onChange([...items, defaults]);
  };
  return (
    <div className="space-y-3">
      {items.map((item, idx) => (
        <div key={idx} className="rounded-xl border border-zinc-200 p-3 space-y-3 relative">
          <button
            type="button"
            onClick={() => remove(idx)}
            className="absolute top-2 right-2 text-xs text-zinc-400 hover:text-red-500 font-bold"
          >
            Remove
          </button>
          {(field.fields || []).map(f => (
            <FieldInput key={f.name} field={f} value={item[f.name]} onChange={v => update(idx, { ...item, [f.name]: v })} />
          ))}
        </div>
      ))}
      <button
        type="button"
        onClick={add}
        className="px-3 py-2 rounded-lg border border-dashed border-zinc-300 text-sm font-semibold text-zinc-500 hover:border-red-300 hover:text-red-600 w-full"
      >
        + Add {field.label.replace(/s$/, '')}
      </button>
    </div>
  );
}

interface Props {
  field: FieldDef;
  value: unknown;
  onChange: (value: unknown) => void;
}

export default function FieldInput({ field, value, onChange }: Props) {
  return (
    <div>
      {field.type !== 'boolean' && <Label field={field} />}
      {field.type === 'text' && <TextInput field={field} value={value} onChange={onChange} />}
      {field.type === 'textarea' && <TextArea field={field} value={value} onChange={onChange} />}
      {field.type === 'number' && <NumberInput field={field} value={value} onChange={onChange} />}
      {field.type === 'date' && <DateInput field={field} value={value} onChange={onChange} />}
      {field.type === 'boolean' && <BooleanInput field={field} value={value} onChange={onChange} />}
      {field.type === 'select' && <SelectInput field={field} value={value} onChange={onChange} />}
      {field.type === 'multiselect' && <MultiSelect field={field} value={value} onChange={onChange} />}
      {field.type === 'list' && !field.fields && <TagList field={field} value={value} onChange={onChange} />}
      {field.type === 'list' && field.fields && <ListOfObjects field={field} value={value} onChange={onChange} />}
      {field.type === 'object' && <ObjectGroup field={field} value={value} onChange={onChange} />}
    </div>
  );
}
