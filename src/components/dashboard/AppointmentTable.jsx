import { Calendar, Clock, User, Phone } from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';

const AppointmentTable = ({ appointments = [] }) => {
  const getStatusColor = (status) => {
    const colors = {
      scheduled: 'success',
      completed: 'primary',
      cancelled: 'danger',
      pending: 'warning',
    };
    return colors[status] || 'primary';
  };

  return (
    <Card>
      <h3 className="text-lg font-bold text-gray-900 mb-6">Upcoming Appointments</h3>

      <div className="space-y-3">
        {appointments.length > 0 ? (
          appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{appointment.patientName}</h4>
                  <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                    <User className="w-4 h-4" />
                    Dr. {appointment.doctorName}
                  </p>
                </div>

                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-700 flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {appointment.date}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                    <Clock className="w-4 h-4" />
                    {appointment.time}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <Badge variant={getStatusColor(appointment.status)}>
                  {appointment.status}
                </Badge>
                <p className="text-xs text-gray-500 md:hidden text-right">
                  {appointment.date} {appointment.time}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center py-6 text-gray-500">No appointments scheduled</p>
        )}
      </div>
    </Card>
  );
};

export default AppointmentTable;
