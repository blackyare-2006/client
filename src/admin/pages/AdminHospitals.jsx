import { useState, useEffect, useCallback } from 'react';
import { Plus, Pencil, Trash2, X, Loader2, Building2, Upload, Link as LinkIcon } from 'lucide-react';
import { adminGetHospitals, adminCreateHospital, adminUpdateHospital, adminDeleteHospital, adminUploadImage } from '../adminApi';
import sampleHospitals from '../../data/hospitals';

// All known districts — pulled from sample data + any new ones added via DB
const BASE_DISTRICTS = ['Hodan','Wadajir','Bondhere','Yaqshid','Hamar Weyne','Karaan','Abdiaziz','Wardhiigleey'];

const EMPTY_FORM = {
  name: '', district: '', address: '', phone: '', description: '',
  image: '', founded: '', bedCount: '', famousFor: '',
  departments: '', featured: false,
};

export default function AdminHospitals() {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [imageMode, setImageMode] = useState('url'); // 'url' | 'upload'
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [customDistrict, setCustomDistrict] = useState('');
  const [showAddDistrict, setShowAddDistrict] = useState(false);

  const load = useCallback(() => {
    setLoading(true);
    adminGetHospitals().then(setHospitals).finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  // Build district list from base + DB hospitals + sample hospitals
  const allDistricts = [
    ...new Set([
      ...BASE_DISTRICTS,
      ...hospitals.map(h => h.district).filter(Boolean),
      ...sampleHospitals.map(h => h.district).filter(Boolean),
    ])
  ].sort();

  function openAdd() {
    setForm(EMPTY_FORM);
    setError('');
    setImageMode('url');
    setImagePreview('');
    setCustomDistrict('');
    setShowAddDistrict(false);
    setModal('add');
  }

  function openEdit(h) {
    setForm({
      name: h.name || '', district: h.district || '', address: h.address || '',
      phone: h.phone || '', description: h.description || '', image: h.image || '',
      founded: h.founded || '', bedCount: h.bedCount || '', famousFor: h.famousFor || '',
      departments: (h.departments || []).join(', '), featured: h.featured || false,
    });
    setImagePreview(h.image || '');
    setImageMode('url');
    setError('');
    setCustomDistrict('');
    setShowAddDistrict(false);
    setModal({ edit: h });
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
    if (name === 'image') setImagePreview(value);
  }

  function handleDistrictSelect(e) {
    const val = e.target.value;
    if (val === '__new__') {
      setShowAddDistrict(true);
    } else {
      setForm(f => ({ ...f, district: val }));
      setShowAddDistrict(false);
    }
  }

  function handleAddDistrict() {
    if (customDistrict.trim()) {
      setForm(f => ({ ...f, district: customDistrict.trim() }));
      setShowAddDistrict(false);
      setCustomDistrict('');
    }
  }

  async function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const { url } = await adminUploadImage(file);
      setForm(f => ({ ...f, image: url }));
      setImagePreview(url);
    } catch {
      setError('Image upload failed. Check that the server is running.');
    } finally {
      setUploading(false);
    }
  }

  async function handleSave() {
    if (!form.name || !form.district) { setError('Name and district are required'); return; }
    setSaving(true); setError('');
    const payload = {
      ...form,
      founded: form.founded ? Number(form.founded) : undefined,
      bedCount: form.bedCount ? Number(form.bedCount) : undefined,
      departments: form.departments ? form.departments.split(',').map(s => s.trim()).filter(Boolean) : [],
    };
    try {
      if (modal === 'add') await adminCreateHospital(payload);
      else await adminUpdateHospital(modal.edit._id, payload);
      setModal(null);
      load();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save hospital');
    } finally { setSaving(false); }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this hospital?')) return;
    await adminDeleteHospital(id); load();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-semibold text-teal-950">Hospitals</h1>
          <p className="text-sm text-ink-600 mt-0.5">{hospitals.length} hospitals in database</p>
        </div>
        <button onClick={openAdd}
          className="flex items-center gap-2 bg-teal-900 text-sand-50 text-sm font-medium px-4 py-2.5 rounded-full hover:bg-teal-800 transition-colors">
          <Plus size={16} /> Add hospital
        </button>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-ink-400 py-16 justify-center">
          <Loader2 size={18} className="animate-spin" /> Loading hospitals…
        </div>
      ) : hospitals.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-teal-900/10">
          <Building2 size={32} className="text-teal-200 mx-auto mb-3" />
          <p className="text-ink-400 mb-2">No hospitals in database yet.</p>
          <p className="text-xs text-ink-400">Sample data hospitals are shown on the public site until you add real ones here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {hospitals.map(h => (
            <div key={h._id} className="bg-white rounded-2xl border border-teal-900/10 overflow-hidden">
              <div className="h-32 overflow-hidden bg-teal-50">
                {h.image
                  ? <img src={h.image} alt={h.name} className="w-full h-full object-cover" />
                  : <div className="w-full h-full flex items-center justify-center"><Building2 size={32} className="text-teal-200" /></div>
                }
              </div>
              <div className="p-4">
                <h3 className="font-display font-semibold text-teal-950 truncate">{h.name}</h3>
                <p className="text-sm text-ink-600 mt-0.5">{h.district}</p>
                {h.famousFor && <p className="text-xs text-gold-700 mt-1">Famous for: {h.famousFor}</p>}
                <div className="flex gap-2 mt-3">
                  <button onClick={() => openEdit(h)}
                    className="flex items-center gap-1.5 text-xs font-medium text-teal-900 border border-teal-900/20 px-3 py-1.5 rounded-full hover:bg-teal-50 transition-colors">
                    <Pencil size={12} /> Edit
                  </button>
                  <button onClick={() => handleDelete(h._id)}
                    className="flex items-center gap-1.5 text-xs font-medium text-danger-600 border border-danger-600/20 px-3 py-1.5 rounded-full hover:bg-danger-100 transition-colors">
                    <Trash2 size={12} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-teal-950/60 backdrop-blur-sm" onClick={() => setModal(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6">
            <button onClick={() => setModal(null)} className="absolute top-4 right-4 text-ink-400 hover:text-ink-900"><X size={18} /></button>
            <h2 className="font-display text-lg font-semibold text-teal-950 mb-5">
              {modal === 'add' ? 'Add hospital' : `Edit — ${modal.edit.name}`}
            </h2>

            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-medium text-ink-600 mb-1">Hospital name *</label>
                <input type="text" name="name" value={form.name} onChange={handleChange}
                  placeholder="e.g. Banadir Hospital"
                  className="w-full border border-teal-900/15 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-900/20" />
              </div>

              {/* District */}
              <div>
                <label className="block text-xs font-medium text-ink-600 mb-1">District *</label>
                {showAddDistrict ? (
                  <div className="flex gap-2">
                    <input type="text" value={customDistrict} onChange={e => setCustomDistrict(e.target.value)}
                      placeholder="Type new district name"
                      className="flex-1 border border-teal-900/15 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-900/20" />
                    <button onClick={handleAddDistrict}
                      className="text-sm font-medium bg-teal-900 text-sand-50 px-3 py-2 rounded-xl hover:bg-teal-800">
                      Add
                    </button>
                    <button onClick={() => setShowAddDistrict(false)}
                      className="text-sm text-ink-400 px-2 py-2 rounded-xl hover:bg-sand-100">
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <select value={form.district} onChange={handleDistrictSelect}
                      className="flex-1 border border-teal-900/15 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-900/20 bg-white">
                      <option value="">Select district…</option>
                      {allDistricts.map(d => <option key={d} value={d}>{d}</option>)}
                      <option value="__new__">+ Add new district</option>
                    </select>
                  </div>
                )}
                {form.district && !showAddDistrict && (
                  <p className="text-xs text-teal-700 mt-1">Selected: {form.district}</p>
                )}
              </div>

              {/* Image */}
              <div>
                <label className="block text-xs font-medium text-ink-600 mb-1">Hospital image</label>
                <div className="flex gap-2 mb-2">
                  <button onClick={() => setImageMode('url')}
                    className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${imageMode === 'url' ? 'bg-teal-900 text-sand-50 border-teal-900' : 'border-teal-900/20 text-teal-950 hover:bg-teal-50'}`}>
                    <LinkIcon size={12} /> URL
                  </button>
                  <button onClick={() => setImageMode('upload')}
                    className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${imageMode === 'upload' ? 'bg-teal-900 text-sand-50 border-teal-900' : 'border-teal-900/20 text-teal-950 hover:bg-teal-50'}`}>
                    <Upload size={12} /> Upload file
                  </button>
                </div>

                {imageMode === 'url' ? (
                  <input type="text" name="image" value={form.image} onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                    className="w-full border border-teal-900/15 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-900/20" />
                ) : (
                  <div className="relative border-2 border-dashed border-teal-900/20 rounded-xl p-4 text-center hover:border-teal-900/40 transition-colors">
                    <input type="file" accept="image/jpeg,image/png,image/webp"
                      onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                    {uploading ? (
                      <div className="flex items-center justify-center gap-2 text-sm text-ink-400">
                        <Loader2 size={16} className="animate-spin" /> Uploading…
                      </div>
                    ) : (
                      <div className="text-sm text-ink-400">
                        <Upload size={20} className="mx-auto mb-1 text-teal-900/40" />
                        Click to upload or drag image here<br />
                        <span className="text-xs">JPEG, PNG, WebP — max 5MB</span>
                      </div>
                    )}
                  </div>
                )}

                {imagePreview && (
                  <div className="mt-2 h-24 rounded-xl overflow-hidden bg-teal-50">
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              {/* Other fields */}
              {[
                { name: 'address', label: 'Address', placeholder: 'Full address' },
                { name: 'phone', label: 'Phone', placeholder: '+252 61 ...' },
                { name: 'famousFor', label: 'Famous for', placeholder: 'e.g. Maternity & Newborn Care' },
                { name: 'founded', label: 'Founded (year)', placeholder: '1990' },
                { name: 'bedCount', label: 'Bed count', placeholder: '150' },
                { name: 'departments', label: 'Departments (comma separated)', placeholder: 'Pediatrics, Surgery, Cardiology' },
              ].map(({ name, label, placeholder }) => (
                <div key={name}>
                  <label className="block text-xs font-medium text-ink-600 mb-1">{label}</label>
                  <input type="text" name={name} value={form[name]} onChange={handleChange} placeholder={placeholder}
                    className="w-full border border-teal-900/15 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-900/20" />
                </div>
              ))}

              <div>
                <label className="block text-xs font-medium text-ink-600 mb-1">Description</label>
                <textarea name="description" value={form.description} onChange={handleChange} rows={3}
                  className="w-full border border-teal-900/15 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-900/20 resize-none" />
              </div>

              <label className="flex items-center gap-2 text-sm text-ink-600 cursor-pointer">
                <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} className="rounded" />
                Show as featured hospital on homepage
              </label>
            </div>

            {error && <p className="text-sm text-danger-600 bg-danger-100 px-3 py-2 rounded-xl mt-4">{error}</p>}

            <div className="flex gap-3 mt-5">
              <button onClick={() => setModal(null)} className="flex-1 py-2.5 text-sm font-medium border border-teal-900/15 rounded-full hover:bg-sand-100">Cancel</button>
              <button onClick={handleSave} disabled={saving}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium bg-teal-900 text-sand-50 rounded-full hover:bg-teal-800 disabled:opacity-50">
                {saving && <Loader2 size={14} className="animate-spin" />}
                {modal === 'add' ? 'Add hospital' : 'Save changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
