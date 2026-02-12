import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const LoginPage = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);

  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!phone.trim() || !pin.trim()) {
      setError('Введите номер телефона и ПИН');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('http://localhost:4000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone: phone.trim(), pin: pin.trim() }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || 'Не удалось войти');
        setLoading(false);
        return;
      }

      const data = await res.json();
      setAuth({ user: data.user, token: data.token });
      navigate('/');
    } catch (err) {
      console.error(err);
      setError('Ошибка сети');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="loginRoot">
      <div className="loginPanel">
        <h1 className="loginTitle">Family Messenger</h1>
        <p className="loginSubtitle">Войдите по номеру телефона и ПИН-коду</p>

        <form onSubmit={handleSubmit} className="loginForm">
          <label className="loginLabel">
            <span>Телефон</span>
            <input
              className="loginInput"
              type="tel"
              placeholder="+7 999 000 00 00"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </label>

          <label className="loginLabel">
            <span>ПИН</span>
            <input
              className="loginInput"
              type="password"
              placeholder="••••"
              value={pin}
              maxLength={6}
              onChange={(e) => setPin(e.target.value)}
            />
          </label>

          {error && <div className="loginError">{error}</div>}

          <button className="loginButton" type="submit" disabled={loading}>
            {loading ? 'Входим...' : 'Войти'}
          </button>

          <p className="loginHint">
            Аккаунты создаются вручную. Если у вас ещё нет ПИН-кода, спросите у администратора семьи.
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

