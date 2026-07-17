from locust import HttpUser, task, between
from datetime import datetime, timedelta
import random


class PelangganAliaOyeUser(HttpUser):
    host = "http://127.0.0.1:8000/api"
    wait_time = between(1, 3)

    def on_start(self):
        self.token = None
        self.headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
        }
        self.login()

    def login(self):
        payload = {
            "email": "anantha@gmail.com",
            "password": "123456"
        }

        with self.client.post(
            "/login",
            json=payload,
            headers=self.headers,
            name="Login",
            catch_response=True
        ) as response:
            if response.status_code == 200:
                data = response.json()
                self.token = data.get("token")

                if self.token:
                    self.headers["Authorization"] = f"Bearer {self.token}"
                    response.success()
                else:
                    response.failure("Token tidak ditemukan")
            else:
                response.failure(f"Login gagal: {response.status_code} - {response.text}")

    @task(5)
    def lihat_layanan(self):
        with self.client.get(
            "/layanan",
            headers=self.headers,
            name="Lihat Layanan",
            catch_response=True
        ) as response:
            if response.status_code == 200:
                response.success()
            else:
                response.failure(f"Gagal lihat layanan: {response.status_code}")

    @task(4)
    def cek_slot_booking(self):
        tanggal = (datetime.now() + timedelta(days=random.randint(1, 7))).strftime("%Y-%m-%d")

        params = {
            "tanggal": tanggal,
            "id_layanan": 1
        }

        with self.client.get(
            "/pelanggan/slot-booking",
            params=params,
            headers=self.headers,
            name="Cek Slot Booking",
            catch_response=True
        ) as response:
            if response.status_code == 200:
                response.success()
            else:
                response.failure(f"Gagal cek slot: {response.status_code} - {response.text}")

    @task(2)
    def booking_layanan_nail_art(self):
        tanggal = (datetime.now() + timedelta(days=random.randint(1, 7))).strftime("%Y-%m-%d")

        payload = {
            "id_layanan": 1,
            "tanggal_pesanan": tanggal,
            "jam_pesanan": "10:00",
            "bagian_kuku": "Tangan",
            "layanan_tambahan": "Tidak ada",
            "catatan": "Pengujian load testing menggunakan Locust"
        }

        with self.client.post(
            "/pelanggan/pesanan/nail-art",
            json=payload,
            headers=self.headers,
            name="Booking Layanan Nail Art",
            catch_response=True
        ) as response:
            if response.status_code == 201:
                response.success()
            else:
                response.failure(f"Gagal booking: {response.status_code} - {response.text}")

    @task(4)
    def lihat_pesanan(self):
        with self.client.get(
            "/pelanggan/pesanan",
            headers=self.headers,
            name="Lihat Pesanan",
            catch_response=True
        ) as response:
            if response.status_code == 200:
                response.success()
            else:
                response.failure(f"Gagal lihat pesanan: {response.status_code} - {response.text}")