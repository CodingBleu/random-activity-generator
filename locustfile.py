from locust import HttpUser, TaskSet, task, between
import random

class UserBehavior(TaskSet):
    @task
    def generate_activity(self):
        # Lade die Seite, die den Knopf enthält
        response = self.client.get("/")
        if response.status_code == 200:
            # Generiere eine zufällige Anzahl von Teilnehmern zwischen 1 und 10
            participants = random.randint(1, 10)
            # Klicke den "generate-btn" Knopf durch das Auslösen der entsprechenden Aktion
            self.client.get("/random-activity?participants={participants}&category=random&location=indoor", {
                "button": "generate-btn"
                # Füge hier andere erforderliche Formulardaten hinzu
            })

class WebsiteUser(HttpUser):
    tasks = [UserBehavior]
    wait_time = between(1, 5)  # Wartezeit zwischen den Aufgaben (in Sekunden)