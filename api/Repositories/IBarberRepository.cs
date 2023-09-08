using team_status_undefined_backend.Models;

namespace team_status_undefined_backend.Repositories;

public interface IBarberRepository
{
    IEnumerable<Barber> GetAllBarbers();
    IEnumerable<Barber> SearchBarbers(string search);
    Barber? GetBarberById(int barberId);

    Barber? UpdateBarber(Barber newBarber);
    void DeleteBarberById(int barberId);
    Barber? CreateUser(Barber user);
    string SignIn(string email, string password);
}
