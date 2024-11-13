import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import React from 'react'

function TimeDateSelection({ date, handleDateChange, timeSlots, setSelectedTime, enableTimeSlot, selectedTime, prevBooking }) {
  /**
   * Checks if a time slot is already booked.
   * @param {string} time - The time to check.
   * @returns {boolean} - True if the time slot is booked, false otherwise.
   */
  const checkTimeSlot = (time) => prevBooking.some(item => item.selectedTime === time);

  return (
    <div className='md:col-span-2 flex px-4'>
      <div className='flex flex-col'>
        <h2 className='font-bold text-lg'>Select Date & Time</h2>
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateChange}
          className="rounded-md border mt-5"
          disabled={(date) => date <= new Date()}
        />
      </div>
      <div className='flex flex-col w-full overflow-auto gap-4 p-5' style={{ maxHeight: '400px' }}>
        {timeSlots?.map((time, index) => (
          <Button
            key={index}
            onClick={() => setSelectedTime(time)}
            className={`border-primary text-primary ${time === selectedTime && 'bg-primary text-white'}`}
            variant="outline"
          >
            {time}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default TimeDateSelection