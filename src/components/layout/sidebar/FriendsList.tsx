import { Link } from 'react-router-dom';
import { users } from '../../layout/sidebar/dataUsers';

const Friends = () => {
  return (
    <div>
      {users.map((friend) => (
        <Link
          key={friend.id}
          to={`/message/${friend.id}`} // ВАЖНО: маршрут на чат
          style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', textDecoration: 'none' }}
        >
          <img src={friend.avatar} alt={friend.name} width={40} height={40} style={{ borderRadius: '50%', marginRight: 10 }} />
          <span>{friend.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default Friends;
