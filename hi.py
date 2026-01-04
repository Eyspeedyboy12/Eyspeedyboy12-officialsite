from datetime import datetime, timedelta, timezone

# Define the timezone offset
offset = timezone(timedelta(hours=2))

# Get current time in UTC
now_utc = datetime.now(timezone.utc)

# Convert to UTC+2
now_plus_2 = now_utc.astimezone(offset)

# Target date: Jan 1, 2026 00:00:00 in UTC+2
target_date = datetime(2026, 1, 1, 0, 0, 0, tzinfo=offset)

# Calculate difference
time_difference = target_date - now_plus_2

# Total seconds
total_seconds = time_difference.total_seconds()

# Convert to hours
hours_left = total_seconds / 3600

print(f"Current time (UTC+2): {now_plus_2}")
print(f"Target time (UTC+2): {target_date}")
print(f"Hours left: {hours_left}")