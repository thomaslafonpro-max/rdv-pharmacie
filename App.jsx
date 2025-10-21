import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, Settings, Plus, Trash2, Search, CheckCircle, LogOut, LogIn } from 'lucide-react';

const PharmacyAppointmentApp = () => {
  const [appMode, setAppMode] = useState('choose');
  const [loggedInPro, setLoggedInPro] = useState(null);
  const [notifications, setNotifications] = useState([]);
  
  const [pharmacists, setPharmacists] = useState([
    {
      id: 1,
      email: 'marie.dubois@pharma.fr',
      password: 'demo123',
      name: 'Pharmacie Dubois',
      pharmacist: 'Marie Dubois',
      postalCode: '24330',
      city: 'Mensignac',
      address: '12 Rue Principale',
      motifs: ['Vaccination COVID-19', 'Vaccination Grippe', 'Bilan de medication', 'Conseil pharmaceutique'],
      slots: [
        { day: 'Lundi', timeSlots: ['09:00', '09:30', '10:00', '10:30', '11:00', '14:00', '14:30', '15:00', '16:00'] },
        { day: 'Mardi', timeSlots: ['09:00', '09:30', '10:00', '10:30', '11:00', '14:00', '14:30', '15:00'] },
        { day: 'Mercredi', timeSlots: ['09:00', '09:30', '10:00', '10:30', '11:00'] },
        { day: 'Jeudi', timeSlots: ['09:00', '09:30', '10:00', '14:00', '14:30', '15:00', '16:00'] },
        { day: 'Vendredi', timeSlots: ['09:00', '09:30', '10:00', '10:30', '11:00', '14:00'] }
      ],
      appointments: []
    },
    {
      id: 2,
      email: 'sophie.martin@pharma.fr',
      password: 'demo123',
      name: 'Pharmacie Martin',
      pharmacist: 'Sophie Martin',
      postalCode: '24330',
      city: 'Saint-Felix-de-Bourdeilles',
      address: '5 Place de Eglise',
      motifs: ['Vaccination COVID-19', 'Vaccination Grippe', 'Test rapide COVID', 'Entretien pharmaceutique'],
      slots: [
        { day: 'Lundi', timeSlots: ['08:30', '09:00', '09:30', '10:00', '14:00', '15:00'] },
        { day: 'Mardi', timeSlots: ['08:30', '09:00', '09:30', '10:00', '14:00', '15:00'] },
        { day: 'Mercredi', timeSlots: ['08:30', '09:00', '09:30', '10:00'] },
        { day: 'Jeudi', timeSlots: ['14:00', '14:30', '15:00', '16:00', '17:00'] },
        { day: 'Vendredi', timeSlots: ['08:30', '09:00', '09:30', '10:00', '14:00', '15:00'] }
      ],
      appointments: []
    }
  ]);

  const addNotification = (message, type = 'success') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  const NotificationSystem = () => (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map(notif => (
        <div
          key={notif.id}
          className={`min-w-80 p-4 rounded-lg shadow-lg transition-all ${
            notif.type === 'success' ? 'bg-green-600 text-white' :
            notif.type === 'error' ? 'bg-red-500 text-white' :
            notif.type === 'info' ? 'text-white' :
            'bg-yellow-500 text-white'
          }`}
          style={notif.type === 'info' ? { backgroundColor: '#0A2850' } : {}}
        >
          <div className="flex items-center gap-2">
            {notif.type === 'success' && <CheckCircle size={20} />}
            <p className="font-medium">{notif.message}</p>
          </div>
        </div>
      ))}
    </div>
  );

  const ChoiceScreen = () => (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: 'linear-gradient(135deg, #0A2850 0%, #30B695 100%)' }}>
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calendar className="text-yellow-300" size={48} style={{ color: '#FFECA4' }} />
            <h1 className="text-4xl font-bold text-white">RDV Pharmacie</h1>
          </div>
          <p className="text-xl text-yellow-100" style={{ color: '#FFECA4' }}>Gestion de rendez-vous en ligne</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div 
            onClick={() => setAppMode('pro')}
            className="bg-white rounded-xl shadow-xl p-8 cursor-pointer hover:shadow-2xl transition-all transform hover:-translate-y-1"
          >
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#30B695' }}>
              <Settings className="text-white" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-center mb-3" style={{ color: '#0A2850' }}>
              Espace Pharmacien
            </h2>
            <p className="text-gray-600 text-center mb-6">
              Gerez vos creneaux de rendez-vous et vos services
            </p>
            <button className="w-full mt-6 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity" style={{ backgroundColor: '#30B695' }}>
              <LogIn size={20} />
              Se connecter
            </button>
          </div>

          <div 
            onClick={() => setAppMode('patient')}
            className="bg-white rounded-xl shadow-xl p-8 cursor-pointer hover:shadow-2xl transition-all transform hover:-translate-y-1"
          >
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#0A2850' }}>
              <User className="text-white" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-center mb-3" style={{ color: '#0A2850' }}>
              Espace Patient
            </h2>
            <p className="text-gray-600 text-center mb-6">
              Prenez rendez-vous avec votre pharmacien
            </p>
            <button className="w-full mt-6 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity" style={{ backgroundColor: '#0A2850' }}>
              <Search size={20} />
              Rechercher
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const ProRegister = ({ onBack }) => {
    const [formData, setFormData] = useState({
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      pharmacist: '',
      address: '',
      city: '',
      postalCode: ''
    });
    const [error, setError] = useState('');

    const handleRegister = () => {
      if (!formData.email || !formData.password || !formData.name || !formData.pharmacist || 
          !formData.address || !formData.city || !formData.postalCode) {
        setError('Veuillez remplir tous les champs');
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setError('Les mots de passe ne correspondent pas');
        return;
      }

      if (pharmacists.find(p => p.email === formData.email)) {
        setError('Cet email est deja utilise');
        return;
      }

      const newPharma = {
        id: Math.max(...pharmacists.map(p => p.id), 0) + 1,
        email: formData.email,
        password: formData.password,
        name: formData.name,
        pharmacist: formData.pharmacist,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        motifs: ['Vaccination COVID-19', 'Vaccination Grippe', 'Bilan de medication'],
        slots: [
          { day: 'Lundi', timeSlots: ['09:00', '10:00', '11:00', '14:00', '15:00'] },
          { day: 'Mardi', timeSlots: ['09:00', '10:00', '11:00', '14:00', '15:00'] },
          { day: 'Mercredi', timeSlots: ['09:00', '10:00', '11:00'] },
          { day: 'Jeudi', timeSlots: ['09:00', '10:00', '11:00', '14:00', '15:00'] },
          { day: 'Vendredi', timeSlots: ['09:00', '10:00', '11:00', '14:00'] }
        ],
        appointments: []
      };

      setPharmacists([...pharmacists, newPharma]);
      setLoggedInPro(newPharma);
      setError('');
      addNotification('Compte cree avec succes !', 'success');
    };

    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={{ background: 'linear-gradient(135deg, #0A2850 0%, #30B695 100%)' }}>
        <div className="bg-white rounded-xl shadow-xl p-8 max-w-2xl w-full max-h-screen overflow-y-auto">
          <button onClick={onBack} className="text-gray-600 hover:text-gray-800 mb-4">← Retour</button>
          
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#30B695' }}>
              <Plus className="text-white" size={32} />
            </div>
            <h2 className="text-2xl font-bold mb-2" style={{ color: '#0A2850' }}>Inscription Pharmacien</h2>
            <p className="text-gray-600">Creez votre compte professionnel</p>
          </div>

          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Nom de la pharmacie"
                className="w-full px-4 py-3 border rounded-lg"
              />
              <input
                type="text"
                value={formData.pharmacist}
                onChange={(e) => setFormData({ ...formData, pharmacist: e.target.value })}
                placeholder="Nom du pharmacien"
                className="w-full px-4 py-3 border rounded-lg"
              />
            </div>

            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="Adresse"
              className="w-full px-4 py-3 border rounded-lg"
            />

            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="Ville"
                className="w-full px-4 py-3 border rounded-lg"
              />
              <input
                type="text"
                value={formData.postalCode}
                onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                placeholder="Code postal"
                className="w-full px-4 py-3 border rounded-lg"
              />
            </div>

            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Email"
              className="w-full px-4 py-3 border rounded-lg"
            />

            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Mot de passe"
                className="w-full px-4 py-3 border rounded-lg"
              />
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder="Confirmer"
                className="w-full px-4 py-3 border rounded-lg"
              />
            </div>

            {error && <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm">{error}</div>}

            <button
              onClick={handleRegister}
              className="w-full text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              style={{ backgroundColor: '#30B695' }}
            >
              Creer mon compte
            </button>
          </div>
        </div>
      </div>
    );
  };

  const ProLogin = () => {
    const [showRegister, setShowRegister] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
      const pharma = pharmacists.find(p => p.email === email && p.password === password);
      if (pharma) {
        setLoggedInPro(pharma);
        setError('');
        addNotification(`Bienvenue ${pharma.pharmacist}!`, 'success');
      } else {
        setError('Email ou mot de passe incorrect');
        addNotification('Identifiants incorrects', 'error');
      }
    };

    if (showRegister) {
      return <ProRegister onBack={() => setShowRegister(false)} />;
    }

    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={{ background: 'linear-gradient(135deg, #0A2850 0%, #30B695 100%)' }}>
        <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full">
          <button onClick={() => setAppMode('choose')} className="text-gray-600 hover:text-gray-800 mb-4">← Retour</button>
          
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#30B695' }}>
              <Settings className="text-white" size={32} />
            </div>
            <h2 className="text-2xl font-bold" style={{ color: '#0A2850' }}>Connexion Pharmacien</h2>
          </div>

          <div className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-4 py-3 border rounded-lg"
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe"
              className="w-full px-4 py-3 border rounded-lg"
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            />

            {error && <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm">{error}</div>}

            <button
              onClick={handleLogin}
              className="w-full text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              style={{ backgroundColor: '#30B695' }}
            >
              Se connecter
            </button>

            <div className="text-center">
              <button
                onClick={() => setShowRegister(true)}
                className="font-semibold hover:opacity-80"
                style={{ color: '#30B695' }}
              >
                Pas encore inscrit ? Creer un compte
              </button>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 text-xs text-gray-600">
              <p>Demo: marie.dubois@pharma.fr / demo123</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const PharmacistDashboard = () => {
    const currentPro = pharmacists.find(p => p.id === loggedInPro.id) || loggedInPro;
    const [newMotif, setNewMotif] = useState('');
    const [newSlot, setNewSlot] = useState({ day: 'Lundi', time: '' });
    const [activeTab, setActiveTab] = useState('schedule');

    const handleLogout = () => {
      setLoggedInPro(null);
      setAppMode('choose');
      addNotification('Deconnexion reussie', 'info');
    };

    const updatePharmacist = (updatedPro) => {
      setPharmacists(pharmacists.map(p => p.id === updatedPro.id ? updatedPro : p));
      setLoggedInPro(updatedPro);
    };

    const addMotif = () => {
      if (newMotif.trim()) {
        const updatedPro = { ...currentPro, motifs: [...currentPro.motifs, newMotif] };
        updatePharmacist(updatedPro);
        addNotification('Motif ajoute', 'success');
        setNewMotif('');
      }
    };

    const removeMotif = (index) => {
      const updatedPro = { ...currentPro, motifs: currentPro.motifs.filter((_, i) => i !== index) };
      updatePharmacist(updatedPro);
      addNotification('Motif supprime', 'info');
    };

    const addTimeSlot = () => {
      if (newSlot.time) {
        const dayIndex = currentPro.slots.findIndex(s => s.day === newSlot.day);
        if (dayIndex !== -1) {
          const updatedSlots = [...currentPro.slots];
          if (!updatedSlots[dayIndex].timeSlots.includes(newSlot.time)) {
            updatedSlots[dayIndex].timeSlots = [...updatedSlots[dayIndex].timeSlots, newSlot.time].sort();
            updatePharmacist({ ...currentPro, slots: updatedSlots });
            addNotification('Creneau ajoute', 'success');
          } else {
            addNotification('Ce creneau existe deja', 'warning');
          }
        }
        setNewSlot({ ...newSlot, time: '' });
      }
    };

    const removeTimeSlot = (day, time) => {
      const dayIndex = currentPro.slots.findIndex(s => s.day === day);
      if (dayIndex !== -1) {
        const updatedSlots = [...currentPro.slots];
        updatedSlots[dayIndex].timeSlots = updatedSlots[dayIndex].timeSlots.filter(t => t !== time);
        updatePharmacist({ ...currentPro, slots: updatedSlots });
        addNotification('Creneau supprime', 'info');
      }
    };

    return (
      <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #FFECA4 0%, #fff 100%)' }}>
        <div className="shadow-md" style={{ backgroundColor: '#0A2850' }}>
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-white">{currentPro.name}</h1>
              <p className="text-sm" style={{ color: '#FFECA4' }}>{currentPro.pharmacist}</p>
            </div>
            <button onClick={handleLogout} className="flex items-center gap-2 text-white hover:opacity-80">
              <LogOut size={20} />
              Deconnexion
            </button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setActiveTab('schedule')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${activeTab === 'schedule' ? 'bg-white shadow-md' : 'text-gray-600'}`}
              style={activeTab === 'schedule' ? { color: '#30B695' } : {}}
            >
              Gestion des creneaux
            </button>
            <button
              onClick={() => setActiveTab('appointments')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${activeTab === 'appointments' ? 'bg-white shadow-md' : 'text-gray-600'}`}
              style={activeTab === 'appointments' ? { color: '#30B695' } : {}}
            >
              Rendez-vous ({currentPro.appointments.length})
            </button>
          </div>

          {activeTab === 'schedule' ? (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Motifs de consultation</h2>
                
                <div className="space-y-2 mb-4 max-h-96 overflow-y-auto">
                  {currentPro.motifs.map((motif, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                      <span className="text-gray-700">{motif}</span>
                      <button onClick={() => removeMotif(index)} className="text-red-500 hover:text-red-700">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newMotif}
                    onChange={(e) => setNewMotif(e.target.value)}
                    placeholder="Nouveau motif..."
                    className="flex-1 px-3 py-2 border rounded"
                    onKeyPress={(e) => e.key === 'Enter' && addMotif()}
                  />
                  <button onClick={addMotif} className="text-white px-4 py-2 rounded hover:opacity-90" style={{ backgroundColor: '#30B695' }}>
                    <Plus size={18} />
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Creneaux horaires</h2>

                <div className="flex gap-2 mb-3">
                  <select
                    value={newSlot.day}
                    onChange={(e) => setNewSlot({ ...newSlot, day: e.target.value })}
                    className="px-3 py-2 border rounded"
                  >
                    {currentPro.slots.map(slot => (
                      <option key={slot.day} value={slot.day}>{slot.day}</option>
                    ))}
                  </select>
                  <input
                    type="time"
                    value={newSlot.time}
                    onChange={(e) => setNewSlot({ ...newSlot, time: e.target.value })}
                    className="flex-1 px-3 py-2 border rounded"
                  />
                  <button onClick={addTimeSlot} className="text-white px-4 py-2 rounded hover:opacity-90" style={{ backgroundColor: '#30B695' }}>
                    <Plus size={18} />
                  </button>
                </div>

                <div className="max-h-96 overflow-y-auto space-y-3">
                  {currentPro.slots.map((slot) => (
                    <div key={slot.day} className="bg-gray-50 p-3 rounded">
                      <h3 className="font-semibold text-gray-700 mb-2">{slot.day}</h3>
                      <div className="flex flex-wrap gap-2">
                        {slot.timeSlots.map((time) => (
                          <div key={time} className="px-3 py-1 rounded-full text-sm flex items-center gap-2 text-white" style={{ backgroundColor: '#30B695' }}>
                            {time}
                            <button onClick={() => removeTimeSlot(slot.day, time)} className="text-white hover:opacity-80 font-bold">×</button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Rendez-vous a venir</h2>
              {currentPro.appointments.length === 0 ? (
                <p className="text-center text-gray-500 py-8">Aucun rendez-vous</p>
              ) : (
                <div className="space-y-3">
                  {currentPro.appointments.map((apt, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <p className="font-semibold text-gray-800">{apt.patientName}</p>
                      <p className="text-sm text-gray-600">{apt.motif}</p>
                      <p className="text-sm text-gray-500">{apt.day} a {apt.time}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  const PatientInterface = () => {
    const [searchPostalCode, setSearchPostalCode] = useState('');
    const [filteredPharmas, setFilteredPharmas] = useState(pharmacists);
    const [selectedPharmaId, setSelectedPharmaId] = useState(null);
    const [selectedMotif, setSelectedMotif] = useState('');
    const [selectedDay, setSelectedDay] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [patientInfo, setPatientInfo] = useState({ name: '', email: '', phone: '' });
    const [bookingConfirmed, setBookingConfirmed] = useState(false);

    const selectedPharma = selectedPharmaId ? pharmacists.find(p => p.id === selectedPharmaId) : null;

    const searchPharmacies = () => {
      if (searchPostalCode.trim()) {
        const filtered = pharmacists.filter(p => p.postalCode.includes(searchPostalCode));
        setFilteredPharmas(filtered);
        if (filtered.length === 0) {
          addNotification('Aucune pharmacie trouvee', 'warning');
        } else {
          addNotification(`${filtered.length} pharmacie(s) trouvee(s)`, 'info');
        }
      } else {
        setFilteredPharmas(pharmacists);
      }
    };

    const selectPharmacy = (pharma) => {
      setSelectedPharmaId(pharma.id);
      setSelectedMotif('');
      setSelectedDay('');
      setSelectedTime('');
      setBookingConfirmed(false);
    };

    const confirmBooking = () => {
      if (selectedMotif && selectedDay && selectedTime && patientInfo.name && patientInfo.email && patientInfo.phone) {
        const appointment = {
          patientName: patientInfo.name,
          patientEmail: patientInfo.email,
          patientPhone: patientInfo.phone,
          motif: selectedMotif,
          day: selectedDay,
          time: selectedTime,
          date: new Date().toISOString()
        };
        
        const updatedPharma = { ...selectedPharma, appointments: [...selectedPharma.appointments, appointment] };
        setPharmacists(pharmacists.map(p => p.id === updatedPharma.id ? updatedPharma : p));
        setBookingConfirmed(true);
        addNotification('Rendez-vous confirme!', 'success');
      }
    };

    const resetBooking = () => {
      setSelectedPharmaId(null);
      setSelectedMotif('');
      setSelectedDay('');
      setSelectedTime('');
      setPatientInfo({ name: '', email: '', phone: '' });
      setBookingConfirmed(false);
    };

    const backToChoice = () => {
      setAppMode('choose');
      resetBooking();
    };

    if (bookingConfirmed) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6" style={{ background: 'linear-gradient(135deg, #FFECA4 0%, #fff 100%)' }}>
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#30B695' }}>
                <CheckCircle className="text-white" size={32} />
              </div>
              <h2 className="text-2xl font-bold mb-2" style={{ color: '#0A2850' }}>Rendez-vous confirme!</h2>
              
              <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left space-y-3">
                <div className="border-b pb-3">
                  <p className="text-sm text-gray-500">Pharmacie</p>
                  <p className="font-semibold text-gray-800">{selectedPharma.name}</p>
                  <p className="text-sm text-gray-600">{selectedPharma.address}</p>
                </div>
                
                <div className="border-b pb-3">
                  <p className="text-sm text-gray-500">Patient</p>
                  <p className="font-semibold text-gray-800">{patientInfo.name}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Rendez-vous</p>
                  <p className="font-semibold text-gray-800">{selectedMotif}</p>
                  <p className="text-sm text-gray-600">{selectedDay} a {selectedTime}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={resetBooking}
                  className="flex-1 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90"
                  style={{ backgroundColor: '#0A2850' }}
                >
                  Nouveau rendez-vous
                </button>
                <button
                  onClick={backToChoice}
                  className="flex-1 bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 font-semibold"
                >
                  Retour accueil
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (!selectedPharma) {
      return (
        <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #FFECA4 0%, #fff 100%)' }}>
          <div className="shadow-md" style={{ backgroundColor: '#0A2850' }}>
            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Calendar size={32} style={{ color: '#FFECA4' }} />
                <h1 className="text-2xl font-bold text-white">Trouver une pharmacie</h1>
              </div>
              <button onClick={backToChoice} className="text-white hover:opacity-80 font-semibold">← Retour</button>
            </div>
          </div>

          <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <div className="flex gap-3 mb-6">
                <div className="flex-1 relative">
                  <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={searchPostalCode}
                    onChange={(e) => setSearchPostalCode(e.target.value)}
                    placeholder="Entrez votre code postal..."
                    className="w-full pl-10 pr-4 py-3 border rounded-lg"
                    onKeyPress={(e) => e.key === 'Enter' && searchPharmacies()}
                  />
                </div>
                <button
                  onClick={searchPharmacies}
                  className="text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:opacity-90"
                  style={{ backgroundColor: '#0A2850' }}
                >
                  <Search size={20} />
                  Rechercher
                </button>
              </div>

              <div className="space-y-4">
                {filteredPharmas.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">Aucune pharmacie trouvee</p>
                ) : (
                  filteredPharmas.map(pharma => (
                    <div
                      key={pharma.id}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => selectPharmacy(pharma)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold" style={{ color: '#0A2850' }}>{pharma.name}</h3>
                          <p className="mb-2" style={{ color: '#30B695' }}>{pharma.pharmacist}</p>
                          <p className="text-gray-600 flex items-center gap-2">
                            <MapPin size={16} />
                            {pharma.address}, {pharma.city} - {pharma.postalCode}
                          </p>
                        </div>
                        <button className="text-white px-4 py-2 rounded hover:opacity-90" style={{ backgroundColor: '#0A2850' }}>
                          Prendre RDV
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #FFECA4 0%, #fff 100%)' }}>
        <div className="shadow-md" style={{ backgroundColor: '#0A2850' }}>
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">Prendre rendez-vous</h1>
            <button onClick={() => setSelectedPharmaId(null)} className="text-white hover:opacity-80">← Retour</button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto p-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="mb-6 pb-6 border-b">
              <h2 className="text-2xl font-bold" style={{ color: '#0A2850' }}>{selectedPharma.name}</h2>
              <p style={{ color: '#30B695' }}>{selectedPharma.pharmacist}</p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3" style={{ color: '#0A2850' }}>Motif de consultation</h3>
                <div className="grid grid-cols-2 gap-3">
                  {selectedPharma.motifs.map((motif, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedMotif(motif)}
                      className={`p-3 rounded-lg border-2 transition-all ${selectedMotif === motif ? 'text-white' : 'border-gray-200'}`}
                      style={selectedMotif === motif ? { backgroundColor: '#30B695', borderColor: '#30B695' } : { borderColor: '#0A2850' }}
                    >
                      {motif}
                    </button>
                  ))}
                </div>
              </div>

              {selectedMotif && (
                <div>
                  <h3 className="text-lg font-semibold mb-3" style={{ color: '#0A2850' }}>Choisir un jour</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {selectedPharma.slots.map((slot) => (
                      <button
                        key={slot.day}
                        onClick={() => { setSelectedDay(slot.day); setSelectedTime(''); }}
                        className={`p-3 rounded-lg border-2 transition-all ${selectedDay === slot.day ? 'text-white' : 'border-gray-200'}`}
                        style={selectedDay === slot.day ? { backgroundColor: '#30B695', borderColor: '#30B695' } : { borderColor: '#0A2850' }}
                      >
                        {slot.day}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {selectedDay && (
                <div>
                  <h3 className="text-lg font-semibold mb-3" style={{ color: '#0A2850' }}>Choisir un creneau</h3>
                  <div className="grid grid-cols-4 gap-3">
                    {selectedPharma.slots.find(s => s.day === selectedDay)?.timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`p-3 rounded-lg border-2 transition-all ${selectedTime === time ? 'text-white' : 'border-gray-200'}`}
                        style={selectedTime === time ? { backgroundColor: '#30B695', borderColor: '#30B695' } : { borderColor: '#0A2850' }}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {selectedTime && (
                <div>
                  <h3 className="text-lg font-semibold mb-3" style={{ color: '#0A2850' }}>Vos informations</h3>
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={patientInfo.name}
                      onChange={(e) => setPatientInfo({ ...patientInfo, name: e.target.value })}
                      placeholder="Nom complet"
                      className="w-full px-4 py-3 border rounded-lg"
                    />
                    <input
                      type="email"
                      value={patientInfo.email}
                      onChange={(e) => setPatientInfo({ ...patientInfo, email: e.target.value })}
                      placeholder="Email"
                      className="w-full px-4 py-3 border rounded-lg"
                    />
                    <input
                      type="tel"
                      value={patientInfo.phone}
                      onChange={(e) => setPatientInfo({ ...patientInfo, phone: e.target.value })}
                      placeholder="Telephone"
                      className="w-full px-4 py-3 border rounded-lg"
                    />
                  </div>
                </div>
              )}

              {selectedTime && patientInfo.name && patientInfo.email && patientInfo.phone && (
                <button
                  onClick={confirmBooking}
                  className="w-full text-white py-4 rounded-lg font-semibold text-lg hover:opacity-90"
                  style={{ backgroundColor: '#30B695' }}
                >
                  Confirmer le rendez-vous
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <NotificationSystem />
      {appMode === 'choose' && <ChoiceScreen />}
      {appMode === 'pro' && !loggedInPro && <ProLogin />}
      {appMode === 'pro' && loggedInPro && <PharmacistDashboard />}
      {appMode === 'patient' && <PatientInterface />}
    </>
  );
};

export default PharmacyAppointmentApp;