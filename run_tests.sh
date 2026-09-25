#!/usr/bin/env bash
set -e

echo "=================================================="
echo " Running FinSight Suite Full Verification & Tests"
echo "=================================================="

# 1. Frontend Tests
echo ""
echo "[1/4] Running Frontend Unit Tests..."
cd finsight-suite/frontend
npm test
cd ../..

# 2. Frontend Build
echo ""
echo "[2/4] Verifying Frontend Production Build..."
cd finsight-suite/frontend
npm run build
cd ../..

# 3. Backend Unit & Integration Tests (pytest)
echo ""
echo "[3/4] Running Backend Pytest Suite..."
PYTHONPATH=finsight-suite/backend ./.venv/bin/pytest finsight-suite/backend/tests/ -v

# 4. ML Pipeline Evaluation & Walk-Forward Validation
echo ""
echo "[4/4] Running ML Pipeline Evaluation..."
./.venv/bin/python finsight-suite/ml_training/evaluate_model.py --walk-forward

echo ""
echo "=================================================="
echo " All FinSight Suite Tests Passed Successfully! "
echo "=================================================="
