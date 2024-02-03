import { Link } from 'react-router-dom'

export default function Index() {
  return (
  <div className='container mx-auto'>
    <ul>
      <li><Link to="signup">註冊</Link></li>
      <li><Link to="login">登入</Link></li>
    </ul>
  </div>
  );
}
