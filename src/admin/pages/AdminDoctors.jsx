import { useState, useEffect, useCallback } from 'react';
import { Plus, Pencil, Trash2, X, Loader2, UserRound, Upload, Link as LinkIcon } from 'lucide-react';
import { adminGetDoctors, adminCreateDoctor, adminUpdateDoctor, adminDeleteDoctor, adminGetHospitals, adminUploadImage } from '../adminApi';
import sampleHospitals from '../../data/hospitals';
import sampleDoctors from '../../data/doctors';

const DAYS_OPTIONS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

const BASE_SPECIALTIES = [
  'Cardiology','Neurology','Pediatrics','General Medicine','General Surgery',
  'Maternity','Orthopedics','Dentistry','Gynecology','Ophthalmology',
  'Dermatology','Psychiatry','Radiology','Oncology','Nephrology',
  'Pulmonology','Internal Medicine','Family Medicine','Physiotherapy',
];

const EMPTY_FORM = {
  hospitalId: '', name: '', specialty: '', subSpecialty: '', bio: '',
  yearsExperience: '', price: '', rating: '4.5', reviews: '0',
  days: 'Mon,Tue,Wed,Thu', startTime: '08:00', endTime: '17:00',
  award: '', image: '',
};

export default function AdminDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [dbHospitals, setDbHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hospitalFilter, setHospitalFilter] = useState('');
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [imageMode, setImageMode] = useState('url');
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [customSpecialty, setCustomSpecialty] = useState('');
  const [showAddSpecialty, setShowAddSpecialty] = useState(false);

  const load = useCallback(() => {
    setLoading(true);
    Promise.all([adminGetDoctors(hospitalFilter || undefined), adminGetHospitals()])
      .then(([docs, hosps]) => { setDoctors(docs); setDbHospitals(hosps); })
      .finally(() => setLoading(false));
  }, [hospitalFilter]);

  useEffect(() => { load(); }, [load]);

  // Merge DB hospitals with sample hospitals for the dropdown
  const allHospitals = [
    ...dbHospitals,
    ...sampleHospitals.filter(h => !dbHospitals.some(db => db.name === h.name)),
  ];

  // Build specialty list from base + DB doctors + sample doctors
  const allSpecialties = [
    ...new Set([
      ...BASE_SPECIALTIES,
      ...doctors.map(d => d.specialty).filter(Boolean),
      ...sampleDoctors.map(d => d.specialty).filter(Boolean),
    ])
  ].sort();

  function openAdd() {
    setForm(EMPTY_FORM);
    setError('');
    setImageMode('url');
    setImagePreview('');
    setCustomSpecialty('');
    setShowAddSpecialty(false);
    setModal('add');
  }

  function openEdit(d) {
    setForm({
      hospitalId: d.hospitalId?._id || d.hospitalId || '',
      name: d.name || '', specialty: d.specialty || '', subSpecialty: d.subSpecialty || '',
      bio: d.bio || '', yearsExperience: d.yearsExperience || '', price: d.price || '',
      rating: d.rating || '4.5', reviews: d.reviews || '0',
      days: d.days || 'Mon,Tue,Wed,Thu', startTime: d.startTime || '08:00',
      endTime: d.endTime || '17:00', award: d.award || '', image: d.image || '',
    });
    setImagePreview(d.image || '');
    setImageMode('url');
    setError('');
    setCustomSpecialty('');
    setShowAddSpecialty(false);
    setModal({ edit: d });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (name === 'image') setImagePreview(value);
  }

  function toggleDay(day) {
    const current = form.days ? form.days.split(',').filter(Boolean) : [];
    const updated = current.includes(day) ? current.filter(d => d !== day) : [...current, day];
    setForm(f => ({ ...f, days: updated.join(',') }));
  }

  function handleSpecialtySelect(e) {
    const val = e.target.value;
    if (val === '__new__') {
      setShowAddSpecialty(true);
    } else {
      setForm(f => ({ ...f, specialty: val }));
      setShowAddSpecialty(false);
    }
  }

  function handleAddSpecialty() {
    if (customSpecialty.trim()) {
      setForm(f => ({ ...f, specialty: customSpecialty.trim() }));
      setShowAddSpecialty(false);
      setCustomSpecialty('');
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
    if (!form.hospitalId || !form.name || !form.specialty || !form.price) {
      setError('Hospital, name, specialty and price are required'); return;
    }
    setSaving(true); setError('');
    const payload = {
      ...form,
      yearsExperience: Number(form.yearsExperience) || 0,
      price: Number(form.price),
      rating: Number(form.rating) || 4.5,
      reviews: Number(form.reviews) || 0,
      award: form.award || null,
    };
    try {
      if (modal === 'add') await adminCreateDoctor(payload);
      else await adminUpdateDoctor(modal.edit._id, payload);
      setModal(null); load();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save doctor');
    } finally { setSaving(false); }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this doctor?')) return;
    await adminDeleteDoctor(id); load();
  }

  const selectedDays = form.days ? form.days.split(',').filter(Boolean) : [];

  return (
    <div>
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <div>
          <h1 className="font-display text-2xl font-semibold text-teal-950">Doctors</h1>
          <p className="text-sm text-ink-600 mt-0.5">{doctors.length} doctors in database</p>
        </div>
        <div className="flex gap-3 items-center flex-wrap">
          <select value={hospitalFilter} onChange={e => setHospitalFilter(e.target.value)}
            className="text-sm border border-teal-900/15 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-900/20 bg-white">
            <option value="">All hospitals</option>
            {dbHospitals.map(h => <option key={h._id} value={h._id}>{h.name}</option>)}
          </select>
          <button onClick={openAdd}
            className="flex items-center gap-2 bg-teal-900 text-sand-50 text-sm font-medium px-4 py-2.5 rounded-full hover:bg-teal-800 transition-colors">
            <Plus size={16} /> Add doctor
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-ink-400 py-16 justify-center">
          <Loader2 size={18} className="animate-spin" /> Loading doctors…
        </div>
      ) : doctors.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-teal-900/10">
          <UserRound size={32} className="text-teal-200 mx-auto mb-3" />
          <p className="text-ink-400 mb-2">No doctors in database yet.</p>
          <p className="text-xs text-ink-400">Sample doctors are shown on the public site until you add real ones here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {doctors.map(d => (
            <div key={d._id} className="bg-white rounded-2xl border border-teal-900/10 p-4 flex gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-teal-100 flex items-center justify-center shrink-0">
                {d.image
                  ? <img src={d.image} alt={d.name} className="w-full h-full object-cover" />
                  : <UserRound size={20} className="text-teal-700" />
                }
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-display font-semibold text-teal-950 truncate">{d.name}</h3>
                <p className="text-sm text-rose-600">{d.specialty}</p>
                <p className="text-xs text-ink-400 mt-0.5 truncate">{d.hospitalId?.name || '—'}</p>
                <div className="flex items-center gap-3 mt-1 text-xs text-ink-600">
                  <span>${d.price}</span>
                  <span>{d.startTime}–{d.endTime}</span>
                  <span>{d.days}</span>
                </div>
                <div className="flex gap-2 mt-3">
                  <button onClick={() => openEdit(d)}
                    className="flex items-center gap-1.5 text-xs font-medium text-teal-900 border border-teal-900/20 px-3 py-1.5 rounded-full hover:bg-teal-50 transition-colors">
                    <Pencil size={12} /> Edit
                  </button>
                  <button onClick={() => handleDelete(d._id)}
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
              {modal === 'add' ? 'Add doctor' : `Edit — ${modal.edit.name}`}
            </h2>

            <div className="space-y-4">
              {/* Hospital dropdown */}
              <div>
                <label className="block text-xs font-medium text-ink-600 mb-1">Hospital *</label>
                <select name="hospitalId" value={form.hospitalId} onChange={handleChange}
                  className="w-full border border-teal-900/15 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-900/20 bg-white">
                  <option value="">Select hospital…</option>
                  {allHospitals.map(h => (
                    <option key={h._id || h.id} value={h._id || String(h.id)}>
                      {h.name} — {h.district}
                    </option>
                  ))}
                </select>
              </div>

              {/* Name */}
              <div>
                <label className="block text-xs font-medium text-ink-600 mb-1">Full name *</label>
                <input type="text" name="name" value={form.name} onChange={handleChange}
                  placeholder="Dr. Ahmed Warsame"
                  className="w-full border border-teal-900/15 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-900/20" />
              </div>

              {/* Specialty dropdown */}
              <div>
                <label className="block text-xs font-medium text-ink-600 mb-1">Specialty *</label>
                {showAddSpecialty ? (
                  <div className="flex gap-2">
                    <input type="text" value={customSpecialty} onChange={e => setCustomSpecialty(e.target.value)}
                      placeholder="Type new specialty"
                      className="flex-1 border border-teal-900/15 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-900/20" />
                    <button onClick={handleAddSpecialty}
                      className="text-sm font-medium bg-teal-900 text-sand-50 px-3 py-2 rounded-xl hover:bg-teal-800">
                      Add
                    </button>
                    <button onClick={() => setShowAddSpecialty(false)}
                      className="text-sm text-ink-400 px-2 py-2 rounded-xl hover:bg-sand-100">
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <select value={form.specialty} onChange={handleSpecialtySelect}
                    className="w-full border border-teal-900/15 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-900/20 bg-white">
                    <option value="">Select specialty…</option>
                    {allSpecialties.map(s => <option key={s} value={s}>{s}</option>)}
                    <option value="__new__">+ Add new specialty</option>
                  </select>
                )}
                {form.specialty && !showAddSpecialty && (
                  <p className="text-xs text-teal-700 mt-1">Selected: {form.specialty}</p>
                )}
              </div>

              {/* Sub-specialty */}
              <div>
                <label className="block text-xs font-medium text-ink-600 mb-1">Sub-specialty</label>
                <input type="text" name="subSpecialty" value={form.subSpecialty} onChange={handleChange}
                  placeholder="e.g. Interventional Cardiology"
                  className="w-full border border-teal-900/15 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-900/20" />
              </div>

              {/* Image */}
              <div>
                <label className="block text-xs font-medium text-ink-600 mb-1">Doctor photo</label>
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
                    placeholder="https://example.com/photo.jpg"
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
                        Click to upload doctor photo<br />
                        <span className="text-xs">JPEG, PNG, WebP — max 5MB</span>
                      </div>
                    )}
                  </div>
                )}

                {imagePreview && (
                  <div className="mt-2 w-16 h-16 rounded-full overflow-hidden bg-teal-50">
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              {/* Experience & Price */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-ink-600 mb-1">Years of experience</label>
                  <input type="number" name="yearsExperience" value={form.yearsExperience} onChange={handleChange}
                    placeholder="10"
                    className="w-full border border-teal-900/15 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-900/20" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-ink-600 mb-1">Consultation price (USD) *</label>
                  <input type="number" name="price" value={form.price} onChange={handleChange}
                    placeholder="20"
                    className="w-full border border-teal-900/15 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-900/20" />
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-xs font-medium text-ink-600 mb-1">Bio</label>
                <textarea name="bio" value={form.bio} onChange={handleChange} rows={2}
                  className="w-full border border-teal-900/15 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-900/20 resize-none" />
              </div>

              {/* Working days */}
              <div>
                <label className="block text-xs font-medium text-ink-600 mb-2">Working days</label>
                <div className="flex flex-wrap gap-2">
                  {DAYS_OPTIONS.map(day => (
                    <button key={day} type="button" onClick={() => toggleDay(day)}
                      className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
                        selectedDays.includes(day)
                          ? 'bg-teal-900 text-sand-50 border-teal-900'
                          : 'border-teal-900/20 text-teal-950 hover:bg-teal-50'
                      }`}>
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              {/* Working hours */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-ink-600 mb-1">Start time</label>
                  <input type="time" name="startTime" value={form.startTime} onChange={handleChange}
                    className="w-full border border-teal-900/15 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-900/20" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-ink-600 mb-1">End time</label>
                  <input type="time" name="endTime" value={form.endTime} onChange={handleChange}
                    className="w-full border border-teal-900/15 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-900/20" />
                </div>
              </div>

              {/* Award */}
              <div>
                <label className="block text-xs font-medium text-ink-600 mb-1">Award (optional)</label>
                <input type="text" name="award" value={form.award} onChange={handleChange}
                  placeholder="e.g. best-heart-surgeon"
                  className="w-full border border-teal-900/15 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-900/20" />
              </div>
            </div>

            {error && <p className="text-sm text-danger-600 bg-danger-100 px-3 py-2 rounded-xl mt-4">{error}</p>}

            <div className="flex gap-3 mt-5">
              <button onClick={() => setModal(null)} className="flex-1 py-2.5 text-sm font-medium border border-teal-900/15 rounded-full hover:bg-sand-100">Cancel</button>
              <button onClick={handleSave} disabled={saving}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium bg-teal-900 text-sand-50 rounded-full hover:bg-teal-800 disabled:opacity-50">
                {saving && <Loader2 size={14} className="animate-spin" />}
                {modal === 'add' ? 'Add doctor' : 'Save changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
